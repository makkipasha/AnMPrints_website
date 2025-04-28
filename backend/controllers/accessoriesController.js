const db = require("../config/db");
const path = require("path");
const fs = require("fs");

// Function to generate a unique product code
const generateProductCode = () => {
    const randomStr = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string
    return `ACCY${randomStr}`; // Prefix with "ACCY"
};

exports.createAccessory = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const { name, description, category, price, original_price, color, quantity } = req.body;

        // Log data types
        console.log("Data Types:");
        console.log("name:", typeof name);
        console.log("description:", typeof description);
        console.log("category:", typeof category);
        console.log("price:", typeof price);
        console.log("original_price:", typeof original_price);
        console.log("color:", typeof color);
        console.log("quantity:", typeof quantity);
        console.log("req.files:", Array.isArray(req.files) ? "Array" : typeof req.files);

        const images = req.files ? req.files.map((file) => file.filename).join(",") : null;
        const colors = color ? JSON.stringify(color.split(",")) : null;
        const product_code = generateProductCode(); // Generate unique product code

        if (!name || !category || !price || !original_price || !quantity) {
            return res.status(400).json({ error: "Name, category, price, original_price, and quantity are required" });
        }

        const sqlQuery = `INSERT INTO accessories 
            (name, description, category, price, original_price, colors, quantity, images, product_code) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, description, category, price, original_price, colors, quantity, images, product_code];

        console.log("Executing SQL Query:", sqlQuery);
        console.log("With Values:", values);

        const result = await db.execute(sqlQuery, values);

        console.log("DB Insert Result:", result);

        return res.status(201).json({
            message: "Accessory added successfully",
            name: name,
            product_code: product_code,
        });

    } catch (err) {
        console.error("SQL Error:", err.sqlMessage || err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAccessories = (req, res) => {
    const sql = "SELECT * FROM accessories";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const fieldTypes = {};
            Object.keys(results[0]).forEach((key) => {
                fieldTypes[key] = typeof results[0][key];
            });

            console.log("Field Types:", fieldTypes);
        }

        res.status(200).json(results.map(accessory => ({
            id: accessory.id,
            name: accessory.name,
            description: accessory.description,
            category: accessory.category,
            price: accessory.price,
            original_price: accessory.original_price,
            quantity: accessory.quantity,
            colors: accessory.colors ? JSON.parse(accessory.colors) : [],
            images: accessory.images ? accessory.images.split(",") : [],
            product_code: accessory.product_code, // Include product code
            created_at: accessory.created_at,
        })));
    });
};

exports.getAccessoryById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM accessories WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Accessory not found" });

        const accessory = result[0];
        res.status(200).json({
            id: accessory.id,
            name: accessory.name,
            description: accessory.description,
            category: accessory.category,
            price: accessory.price,
            original_price: accessory.original_price,
            quantity: accessory.quantity,
            colors: accessory.colors ? JSON.parse(accessory.colors) : [],
            images: accessory.images ? accessory.images.split(",") : [],
            product_code: accessory.product_code, // Include product code
            created_at: accessory.created_at,
        });
    });
};


exports.updateAccessory = (req, res) => {
    const { id } = req.params;
    const { name, price, original_price, quantity } = req.body;
    
    const sql = "UPDATE accessories SET name=?, price=?, original_price=?, quantity=? WHERE id=?";
    db.query(sql, [name, price, original_price, quantity, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Accessory updated successfully!" });
    });
};

exports.deleteAccessory = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM accessories WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Accessory deleted successfully!" });
    });
};

exports.getAccessoryByCategory = (req, res) => {
  const { category } = req.params;
  const sql = "SELECT * FROM accessories WHERE category = ?";
  
  db.query(sql, [category], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      
      if (results.length === 0) {
          return res.status(404).json({ message: "No accessories found for this category" });
      }
      
      res.status(200).json(results);
  });
};

exports.getProducts = async (req, res) => {
  try {
      const accessoriesResult = await db.execute(`SELECT id, name, description, category, price, original_price, quantity, colors, images, created_at FROM accessories`);
      const accessories = accessoriesResult[0] || [];

      const categoriesResult = await db.execute(`SELECT id, name, description, image, created_at FROM categories`);
      const categories = categoriesResult[0] || [];

      const products = [
          ...accessories.map(item => ({
              id: item.id,
              name: item.name || null,
              description: item.description,
              category: item.category,
              price: item.price,
              original_price: item.original_price,
              quantity: item.quantity,
              colors: item.colors ? JSON.parse(item.colors) : [],
              sizes: [],
              images: item.images ? item.images.split(',') : [],
              created_at: item.created_at
          })),
          ...categories.map(item => ({
              id: item.id,
              name: item.name,
              description: item.description,
              category: null,
              price: null,
              original_price: null,
              quantity: null,
              colors: [],
              sizes: [],
              images: item.image ? [item.image] : [],
              created_at: item.created_at
          }))
      ];

      res.status(200).json({ products });

  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message });
  }
};