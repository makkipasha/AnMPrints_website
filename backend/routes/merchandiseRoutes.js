const express = require("express");
const multer = require("multer");
const merchandiseController = require("../controllers/merchandiseController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes
router.post("/", upload.array("images", 10), merchandiseController.merchandiseCustomize);
router.put("/:id", merchandiseController.updateMerchandise);
router.delete("/:id", merchandiseController.deleteMerchandise);
router.get('/', merchandiseController.getMerchandise);
router.get('/:id', merchandiseController.getMerchandiseById);

module.exports = router;
