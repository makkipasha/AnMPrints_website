const db = require("../config/db");
const path = require("path");
const fs = require("fs");

exports.addCategory = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const result = await db.execute(
      "INSERT INTO categories (name, description, image) VALUES (?, ?, ?)",
      [name, description, image]
    );
    
    const insertId = result.insertId || result[0]?.insertId;

    return res.status(201).json({
      message: "Category added successfully",
      categoryId: insertId,
    });
    
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get All Categories
exports.getCategories = async (req, res) => {
  try {
    console.log("Fetching categories...");
    const [rows] = await db.promise().query("SELECT * FROM categories");

    if (!Array.isArray(rows)) {
      return res.status(500).json({ error: "Unexpected database response format" });
    }

    return res.json({
      message: "Categories fetched successfully",
      categories: rows,
    });

  } catch (err) {
    console.error("Error fetching categories:", err);
    return res.status(500).json({ error: err.message });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // Fetch existing category data
    const [rows] = await db.promise().query("SELECT image FROM categories WHERE id = ?", [id]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    const existingCategory = rows[0];

    // Delete old image if a new one is uploaded
    if (image && existingCategory.image) {
      const oldImagePath = path.join(__dirname, "../uploads", existingCategory.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update category details
    const [result] = await db.promise().execute(
      "UPDATE categories SET name = ?, description = ?, image = COALESCE(?, image) WHERE id = ?",
      [name, description, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Delete Category

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch category image path
    const [rows] = await db.promise().execute("SELECT image FROM categories WHERE id = ?", [id]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    const category = rows[0]; // Correct way to extract the first row

    // Delete category image if exists
    if (category.image) {
      const imagePath = path.join(__dirname, "../uploads", category.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete category from database
    const [result] = await db.promise().execute("DELETE FROM categories WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getProducts = async (req, res) => {
    try {
        // Fetch accessories data
        const [accessories] = await db.execute(`
            SELECT 
                id, name, description, category, price, 
                quantity, colors, images, created_at
            FROM accessories
        `);

        // Fetch categories data
        const [categories] = await db.execute(`
            SELECT 
                id, name, description, image, created_at
            FROM categories
        `);

        // Format the response
        const products = accessories.map((acc) => ({
            id: acc.id,
            name: acc.name,
            description: acc.description,
            category: acc.category,
            price: acc.price,
            quantity: acc.quantity,
            colors: acc.colors ? JSON.parse(acc.colors) : [],
            sizes: [],  // Since sizes are not in your DB schema, adding an empty array
            images: acc.images ? acc.images.split(",") : [],
            created_at: acc.created_at,
        }));

        const categoryList = categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            image: cat.image ? [cat.image] : [],
            created_at: cat.created_at,
        }));

        // Combine both into a single response
        const response = {
            products,
            categories: categoryList
        };

        res.status(200).json(response);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
};
