const express = require("express");
const multer = require("multer");
const accessoriesController = require("../controllers/accessoriesController");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // Ensure 'uploads/' directory exists
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/", upload.array("files"), accessoriesController.createAccessory);
router.get("/", accessoriesController.getAccessories);
router.get("/:id", accessoriesController.getAccessoryById);
router.put("/:id", accessoriesController.updateAccessory);
router.delete("/:id", accessoriesController.deleteAccessory);
router.get("/category/:category", accessoriesController.getAccessoryByCategory);
router.get("/pro/product", accessoriesController.getProducts);

module.exports = router;
