const db = require("../config/db");
const path = require("path");
const fs = require("fs");



// Function to generate a unique product code
const generateProductCode = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let code = "CUAC";

    for (let i = 0; i < 3; i++) {
        code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
        code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return code;
};

exports.createCustomizeAccessory = (req, res) => {
    console.log("Received Request Body:", req.body);

    const { name, description, category, price, original_price, quantity } = req.body;
    const product_code = generateProductCode();

    console.log("Generated Product Code:", product_code);

    const images = req.files?.files ? req.files.files.map((file) => file.filename) : [];

    let variants;
    try {
        variants = JSON.parse(req.body.colors || "[]");

        if (!Array.isArray(variants) || variants.length === 0) {
            return res.status(400).json({ error: "Variants must be a non-empty array" });
        }
    } catch (error) {
        console.error("JSON Parse Error:", error);
        return res.status(400).json({ error: "Invalid JSON format in colors" });
    }

    const sql = `
        INSERT INTO accessories_products (product_code, name, description, category, price, original_price, quantity) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [product_code, name, description, category, price, original_price, quantity], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const productId = result.insertId;

        const variantSql = `
            INSERT INTO accessories_products_variants (product_id, color, image) 
            VALUES ?
        `;

        const variantValues = variants.map((v, index) => [
            productId,
            v.color,
            images[index] || null
        ]);

        if (variantValues.length > 0) {
            db.query(variantSql, [variantValues], (err) => {
                if (err) {
                    console.error("Error inserting variants:", err);
                    return res.status(500).json({ error: "Error inserting variants" });
                }
                res.json({ message: "Accessory added successfully", productId, product_code });
            });
        } else {
            res.json({ message: "Accessory added successfully", productId, product_code });
        }
    });
};

exports.getCustomizeAccessories = (req, res) => {
    const sql = `
        SELECT p.*, v.id AS variant_id, v.color, v.image 
        FROM accessories_products p
        LEFT JOIN accessories_products_variants v ON p.id = v.product_id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const accessories = {};

        results.forEach(row => {
            if (!accessories[row.id]) {
                accessories[row.id] = {
                    id: row.id,
                    product_code: row.product_code,
                    name: row.name,
                    description: row.description,
                    category: row.category,
                    price: row.price,
                    original_price: row.original_price,
                    quantity: row.quantity,
                    created_at: row.created_at,
                    variants: []
                };
            }

            if (row.variant_id) {
                accessories[row.id].variants.push({
                    id: row.variant_id,
                    color: row.color,
                    image: row.image
                });
            }
        });

        res.json(Object.values(accessories));
    });
};

exports.getCustomizeAccessoryById = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT p.*, v.id AS variant_id, v.color, v.image 
        FROM accessories_products p
        LEFT JOIN accessories_products_variants v ON p.id = v.product_id
        WHERE p.id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: "Accessory not found" });
        }

        const accessory = {
            id: results[0].id,
            product_code: results[0].product_code,
            name: results[0].name,
            description: results[0].description,
            category: results[0].category,
            price: results[0].price,
            original_price: results[0].original_price,
            quantity: results[0].quantity,
            created_at: results[0].created_at,
            variants: []
        };

        results.forEach(row => {
            if (row.variant_id) {
                accessory.variants.push({
                    id: row.variant_id,
                    color: row.color,
                    image: row.image
                });
            }
        });

        res.json(accessory);
    });
};



exports.updateCustomizeAccessory = (req, res) => {
    const { id } = req.params;
    const { price, quantity, description } = req.body;
    
    const sql = `
        UPDATE accessories_products 
        SET price = ?, quantity = ?, description = ? 
        WHERE id = ?
    `;

    db.query(sql, [price, quantity, description, id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error while updating accessory" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Accessory not found" });
        }

        res.json({ message: "Accessory updated successfully" });
    });
};


exports.deleteCustomizeAccessory = (req, res) => {
    const { id } = req.params;
    
    console.log("Attempting to delete accessory with id:", id);

    const deleteVariantsSql = "DELETE FROM accessories_products_variants WHERE product_id = ?";
    db.query(deleteVariantsSql, [id], (err, variantResult) => {
        if (err) {
            console.error("Database Error (Variants):", err);
            return res.status(500).json({ error: "Database error while deleting variants" });
        }

        console.log("Deleted variants:", variantResult.affectedRows);

        const deleteProductSql = "DELETE FROM accessories_products WHERE id = ?";
        db.query(deleteProductSql, [id], (err, productResult) => {
            if (err) {
                console.error("Database Error (Accessory):", err);
                return res.status(500).json({ error: "Database error while deleting accessory" });
            }

            console.log("Deleted accessory:", productResult.affectedRows);

            if (productResult.affectedRows === 0) {
                return res.status(404).json({ error: "Accessory not found" });
            }

            res.json({ message: "Accessory deleted successfully" });
        });
    });
};
