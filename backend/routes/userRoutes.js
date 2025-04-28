const express = require("express");
const { getTotalUsers, getRecentUsers, getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/total-users", getTotalUsers);
router.get("/recent-users", getRecentUsers);
router.get("/users", getAllUsers);

module.exports = router;
