const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload API
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;
    const { product_id } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    // Insert into database
    db.query(
      "INSERT INTO user_images (user_id, product_id, image_path) VALUES (?, ?, ?)",
      [user_id, product_id, imagePath],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        res.status(200).json({ message: "Image uploaded successfully", imagePath });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

module.exports = router;
