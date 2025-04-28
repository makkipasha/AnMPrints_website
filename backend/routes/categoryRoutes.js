const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../middlewares/uploadMiddleware");

// ➤ Add Category (With Image Upload)
router.post("/add", upload.single("image"), categoryController.addCategory);

// ➤ Get All Categories
router.get("/", categoryController.getCategories);

// ➤ Update Category (With Image Upload)
router.put("/update/:id", upload.single("image"), categoryController.updateCategory);

// ➤ Delete Category
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
