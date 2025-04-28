const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Setup multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-merged-image", upload.single("image"), async (req, res) => {
  try {
    const product_id = req.body.product_id;

    if (!req.file || !product_id) {
      return res.status(400).json({ message: "Missing required data." });
    }

    const imageBuffer = req.file.buffer;

    const uploadDir = path.join(__dirname, "../uploads/merged/");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const imageName = `merged_${Date.now()}.png`;
    const imagePath = path.join(uploadDir, imageName);
    fs.writeFileSync(imagePath, imageBuffer);

    res.json({ message: "Image uploaded successfully!", image_url: `uploads/merged/${imageName}` });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
