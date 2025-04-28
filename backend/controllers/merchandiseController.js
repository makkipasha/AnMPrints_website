const db = require("../config/db");
const path = require('path');
const multer = require("multer");

exports.merchandiseCustomize = (req, res) => {
    console.log("Received Request Body:", req.body);

    const { name, description, category, price, original_price, quantity } = req.body;
    
    console.log("Original Price:", original_price, "(Type:", typeof original_price, ")");

    // Generate a unique product code (MERC + random 8-character alphanumeric)
    const productCode = "MERC" + Math.random().toString(36).substring(2, 10).toUpperCase();
    console.log("Generated Product Code:", productCode);

    const images = req.files?.map((file) => file.filename) || [];
    
    let variants;
    try {
        variants = JSON.parse(req.body.colorSizes || "[]");
        if (!Array.isArray(variants) || variants.length === 0) {
            return res.status(400).json({ error: "Variants must be a non-empty array" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Invalid JSON format in colorSizes" });
    }

    // Insert product into `merchandise_products`
    const sql = `
        INSERT INTO merchandise_products (product_code, name, description, category, price, original_price, quantity) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [productCode, name, description, category, price, original_price, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }

        const productId = result.insertId;
        console.log("Inserted Product ID:", productId);

        // Insert variants with images
        const variantSql = `
            INSERT INTO merchandise_products_variants (product_id, color, sizes, image) 
            VALUES ?
        `;

        const variantValues = variants.map((v, index) => [
            productId,
            v.color,
            JSON.stringify(v.sizes),
            images[index] || null
        ]);

        if (variantValues.length > 0) {
            db.query(variantSql, [variantValues], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error inserting variants" });
                }
                res.json({ message: "Product added successfully", productId, productCode });
            });
        } else {
            res.json({ message: "Product added successfully", productId, productCode });
        }
    });
};





exports.getMerchandiseById = (req, res) => {
    const { id } = req.params;

    console.log(`API called with ID: ${id}`);  // Debugging: Log the ID parameter

    const sql = `
        SELECT 
        mp.id, 
        mp.product_code,
        mp.name, 
        mp.description, 
        mp.category, 
        mp.price, 
        mp.original_price,
        mp.quantity,
        mv.color,
        mv.sizes,
        mv.image
        FROM merchandise_products mp
        LEFT JOIN merchandise_products_variants mv ON mp.id = mv.product_id
        WHERE mp.id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        console.log("Raw SQL Results:", results);  // Debugging: Log raw SQL results

        if (results.length === 0) {
            console.log(`No product found for ID: ${id}`);
            return res.status(404).json({ error: "Product not found" });
        }

        // Initialize the product object
        const product = {
            id: results[0].id,
            name: results[0].name,
            description: results[0].description,
            product_code: results[0].product_code,  // Add product_code here
            original_price: results[0].original_price, 
            category: results[0].category,
            price: results[0].price.toString(),  // Convert price to string
            quantity: results[0].quantity.toString(),  // Convert quantity to string
            variants: []
        };

        console.log("Product Initialized:", product);  // Debugging: Log initialized product object

        // Log the data types for product fields
        console.log("ID Type:", typeof product.id);
        console.log("Name Type:", typeof product.name);
        console.log("Description Type:", typeof product.description);
        console.log("Category Type:", typeof product.category);
        console.log("Price Type:", typeof product.price);
        console.log("Quantity Type:", typeof product.quantity);

        // Group variants by color
        const variantMap = new Map();

        results.forEach((row, index) => {
            console.log(`Processing row ${index + 1}:`, row);  // Debugging: Log each row

            if (row.color) {
                if (!variantMap.has(row.color)) {
                    variantMap.set(row.color, {
                        color: row.color,
                        sizes: [],  // Initialize sizes as an empty array
                        image: row.image || ''
                    });
                }

                const variant = variantMap.get(row.color);

                // Log the data types for variant fields
                console.log(`Variant Color Type (${row.color}):`, typeof variant.color);
                console.log(`Variant Image Type (${row.color}):`, typeof variant.image);
                console.log(`Variant Sizes Type (${row.color}):`, typeof variant.sizes);

                // Parse and add sizes with proper error handling
                if (row.sizes) {
                    try {
                        const sizesArray = JSON.parse(row.sizes);

                        // Ensure sizes is an array and update if necessary
                        if (Array.isArray(sizesArray)) {
                            variant.sizes = [...new Set([...variant.sizes, ...sizesArray])];  // Merge and remove duplicates
                        } else {
                            console.error(`Invalid sizes format for ${row.color}:`, row.sizes);
                        }
                    } catch (e) {
                        console.error(`Error parsing sizes for ${row.color}:`, e);
                    }
                }

                // Add image if it does not already exist
                if (row.image) {
                    const imageWithExtension = row.image.endsWith('.jpg') ? row.image : `${row.image}.jpg`;
                    variant.image = imageWithExtension;
                }
            }
        });

        console.log("Variants Map:", variantMap);  // Debugging: Log the entire variant map

        // Log the data types for variants in the map
        console.log("Variants Type:", typeof product.variants);
        product.variants.forEach((variant, index) => {
            console.log(`Variant ${index + 1} Color Type:`, typeof variant.color);
            console.log(`Variant ${index + 1} Sizes Type:`, typeof variant.sizes);
            console.log(`Variant ${index + 1} Image Type:`, typeof variant.image);
        });

        // Convert map to array
        product.variants = Array.from(variantMap.values());

        console.log("Final Product Response:", JSON.stringify(product, null, 2)); // Debugging: Log the final product response

        res.json(product);
    });
};



exports.getMerchandise = (req, res) => {
    const sql = `
        SELECT 
        mp.id, 
        mp.product_code,
        mp.name, 
        mp.description, 
        mp.category, 
        mp.price, 
        mp.original_price,
        mp.quantity,
        mv.color,
        mv.sizes,
        mv.image
        FROM merchandise_products mp
        LEFT JOIN merchandise_products_variants mv ON mp.id = mv.product_id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const merged = results.reduce((acc, row, index) => {
            const { id, product_code, name, description, category, price, original_price, quantity, color, sizes, image } = row;

            console.log(`Row ${index + 1}:`);
            console.log('id:', typeof id);
            console.log('product_code:', typeof product_code);
            console.log('name:', typeof name);
            console.log('description:', typeof description);
            console.log('category:', typeof category);
            console.log('price:', typeof price);
            console.log('original_price:', typeof original_price);
            console.log('quantity:', typeof quantity);
            console.log('color:', typeof color);
            console.log('sizes:', typeof sizes);
            console.log('image:', typeof image);
            console.log('---');

            if (!acc[id]) {
                acc[id] = {
                    id,
                    product_code,
                    name,
                    description,
                    original_price,
                    category,
                    price,
                    quantity,
                    variants: [],
                };
            }

            if (color || sizes || image) {
                acc[id].variants.push({ color, sizes, image });
            }

            return acc;
        }, {});

        const response = Object.values(merged);

        // Log a sample response item type info
        if (response.length > 0) {
            console.log('Sample response structure:');
            for (const [key, value] of Object.entries(response[0])) {
                if (key === 'variants') {
                    console.log(`${key}: array of ${value.length > 0 ? typeof value[0] : 'unknown'}`);
                } else {
                    console.log(`${key}: ${typeof value}`);
                }
            }
        }

        res.json(response);
    });
};





// Update merchandise product (only description, name, price, quantity)
exports.updateMerchandise = (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const sql = `
        UPDATE merchandise_products
        SET name = ?, description = ?, price = ?, quantity = ?
        WHERE id = ?
    `;

    db.query(sql, [name, description, price, quantity, id], (err, result) => {
        if (err) {
            console.error("Error updating product:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Product updated successfully" });
    });
};

// Delete merchandise product and its variants
exports.deleteMerchandise = (req, res) => {
    const { id } = req.params;

    const deleteVariantsSql = `
        DELETE FROM merchandise_products_variants WHERE product_id = ?
    `;

    db.query(deleteVariantsSql, [id], (err) => {
        if (err) {
            console.error("Error deleting variants:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const deleteProductSql = `
            DELETE FROM merchandise_products WHERE id = ?
        `;

        db.query(deleteProductSql, [id], (err) => {
            if (err) {
                console.error("Error deleting product:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "Product and its variants deleted successfully" });
        });
    });
};
