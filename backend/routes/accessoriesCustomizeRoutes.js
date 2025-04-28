const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const customizeAccessoriesController = require("../controllers/customizeAccessoriesController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");  // Make sure the folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


router.post(
    "/",
    upload.fields([
        { name: "files", maxCount: 10 },
        { name: "slide_images", maxCount: 10 }
    ]),
    customizeAccessoriesController.createCustomizeAccessory
);

router.get("/", customizeAccessoriesController.getCustomizeAccessories);
router.get("/:id", customizeAccessoriesController.getCustomizeAccessoryById);
router.put("/:id", customizeAccessoriesController.updateCustomizeAccessory);
router.delete("/:id", customizeAccessoriesController.deleteCustomizeAccessory);

module.exports = router;


