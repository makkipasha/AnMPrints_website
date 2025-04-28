const db = require("../config/db");
const path = require("path");
const fs = require("fs");

const generateProductCode = () => {
    const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase(); // Generate a random alphanumeric string
    return `PROD${randomStr}`; // Prefix with "PROD"
};
exports.addProduct = (req, res) => {
    console.log("Received Request Body:", req.body);

    const { description, category, price, original_price, quantity, colorSizes, name } = req.body;
    
    // Generate product code
    const productCode = generateProductCode();
    
    console.log("Generated Product Code:", productCode);

    console.log("Data Types:");
    console.log("name:", typeof name);
    console.log("description:", typeof description);
    console.log("category:", typeof category);
    console.log("price:", typeof price);
    console.log("original_price:", typeof original_price);
    console.log("quantity:", typeof quantity);
    console.log("colorSizes:", typeof colorSizes);

    const images = req.files?.map((file) => file.filename).join(",") || "";
    console.log("req.files:", Array.isArray(req.files) ? "Array" : typeof req.files);

    let variants;
    try {
        variants = JSON.parse(colorSizes);
        console.log("Variants:", variants);
        console.log("variants data type:", typeof variants);

        if (!Array.isArray(variants) || variants.length === 0) {
            return res.status(400).json({ error: "Variants must be a non-empty array" });
        }
    } catch (error) {
        console.error("JSON Parse Error:", error);
        return res.status(400).json({ error: "Invalid JSON format in colorSizes" });
    }

    // Insert product into the database
    const sql = `INSERT INTO products (product_code, name, description, category, price, original_price, quantity, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [productCode, name, description, category, price, original_price, quantity, images], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const productId = result.insertId;

        // Insert product variants
        const variantSql = `INSERT INTO product_variants (product_id, color, sizes) VALUES ?`;
        const variantValues = variants.map(v => [productId, v.color, JSON.stringify(v.sizes)]);

        db.query(variantSql, [variantValues], (err) => {
            if (err) {
                console.error("Variant Insert Error:", err);
                return res.status(500).json({ error: "Error inserting variants" });
            }

            res.status(201).json({ message: "Product added successfully", product_code: productCode });
        });
    });
};



exports.getAllProducts = (req, res) => {
    const sql = `
        SELECT 
            p.id AS product_id,
            p.description,
            p.category,
            p.images,
            p.product_code,
            p.name,
            p.price,
            p.quantity,
            IFNULL(
                GROUP_CONCAT(
                    CONCAT(
                        '{"variant_id":', v.id, 
                        ',"color":"', v.color, 
                        '","sizes":', v.sizes, '}'
                    )
                ),
                '[]'
            ) AS variants
        FROM products p
        LEFT JOIN product_variants v ON p.id = v.product_id
        GROUP BY p.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const products = results.map(product => {
            const formattedProduct = {
                ...product,
                images: product.images ? product.images.split(",") : [],
                variants: product.variants ? JSON.parse(`[${product.variants}]`) : []
            };

            // Log data types of response fields
            console.log("Product Data Types:");
            for (const key in formattedProduct) {
                console.log(`${key}: ${typeof formattedProduct[key]}`);
            }

            return formattedProduct;
        });

        res.json({ products });
    });
};



  
exports.getProductById = (req, res) => {
    const { id } = req.params;

    const productSql = `SELECT * FROM products WHERE id = ?`;

    db.query(productSql, [id], (err, productResult) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (productResult.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const variantSql = `SELECT color, sizes FROM product_variants WHERE product_id = ?`;

        db.query(variantSql, [id], (err, variantResult) => {
            if (err) {
                console.error("Error fetching variants:", err);
                return res.status(500).json({ error: "Error fetching variants" });
            }

            const product = {
                ...productResult[0],
                images: productResult[0].images ? productResult[0].images.split(",") : [],
            
                variants: variantResult.map(variant => ({
                    color: variant.color,
                    sizes: JSON.parse(variant.sizes)
                }))
            };

            res.json(product);
        });
    });
};


  
exports.updateProduct = (req, res) => {
    const productId = req.body.productId || req.body.get("productId");
    const description = req.body.description || req.body.get("description");
    const price = req.body.price || req.body.get("price");
    const quantity = req.body.quantity || req.body.get("quantity");

    if (!productId || !description || !price) {
        return res.status(400).json({ error: "Product ID, description, and price are required" });
    }

    const sql = `UPDATE products SET description = ?, price = ?, quantity = ? WHERE id = ?`;

    db.query(sql, [description, price, quantity, productId], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product updated successfully" });
    });
};

  



  
exports.deleteProduct = (req, res) => {
  const productId = req.params.id; // Get the product ID from URL params

  // ✅ Delete variants first (due to foreign key relationship)
  const deleteVariantsSql = `DELETE FROM product_variants WHERE product_id = ?`;

  db.query(deleteVariantsSql, [productId], (err, variantResult) => {
      if (err) {
          console.error("Error deleting variants:", err);
          return res.status(500).json({ error: "Failed to delete product variants" });
      }

      // ✅ Delete the main product
      const deleteProductSql = `DELETE FROM products WHERE id = ?`;

      db.query(deleteProductSql, [productId], (err, productResult) => {
          if (err) {
              console.error("Error deleting product:", err);
              return res.status(500).json({ error: "Failed to delete product" });
          }

          if (productResult.affectedRows === 0) {
              return res.status(404).json({ message: "Product not found" });
          }

          res.json({ message: "Product and its variants deleted successfully" });
      });
  });
};




exports.getProductsByCategory = (req, res) => {
    const { category } = req.params;

    // First, get all products in the given category
    const productQuery = `SELECT * FROM products WHERE category = ?`;

    db.query(productQuery, [category], (err, products) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        // Get product IDs to fetch variants
        const productIds = products.map(product => product.id);
        if (productIds.length === 0) {
            return res.json({ products: products.map(p => ({ ...p, images: p.images ? p.images.split(",") : [], variants: [] })) });
        }

        // Fetch variants separately
        const variantQuery = `SELECT * FROM product_variants WHERE product_id IN (?)`;

        db.query(variantQuery, [productIds], (err, variants) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Map variants to their respective products
            const productMap = {};
            products.forEach(product => {
                productMap[product.id] = {
                    ...product,
                    images: product.images ? product.images.split(",") : [],
                    variants: []
                };
            });

            variants.forEach(variant => {
                if (productMap[variant.product_id]) {
                    productMap[variant.product_id].variants.push({
                        variant_id: variant.id,
                        color: variant.color,
                        sizes: variant.sizes
                    });
                }
            });

            res.json({ products: Object.values(productMap) });
        });
    });
};



