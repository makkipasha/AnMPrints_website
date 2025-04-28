const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");

// Ensure the correct controller functions are being used
router.get("/", bannerController.getBanner);
router.post("/", bannerController.upload.single('image'), bannerController.storeBanner);
router.put("/", bannerController.upload.single('image'), bannerController.updateBanner);

module.exports = router;
