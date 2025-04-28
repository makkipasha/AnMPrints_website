const express = require("express");
const router = express.Router();
const accessoriesController = require("../controllers/accessoriesController");

// Routes
router.post("/", accessoriesController.createAccessory);
router.get("/", accessoriesController.getAccessories);
router.get("/:id", accessoriesController.getAccessoryById);
router.put("/:id", accessoriesController.updateAccessory);
router.delete("/:id", accessoriesController.deleteAccessory);
router.get("/category/:category", accessoriesController.getAccessoryByCategory);
router.get("/pro/product", accessoriesController.getProducts);

module.exports = router;
