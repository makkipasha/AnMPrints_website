const express = require("express");
const { register, login ,googleSignup , getProfile,logout , googleAuth} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/google-auth", googleAuth);
router.get("/profile/:id", getProfile);
router.post("/logout",logout);
router.post('/auth/google-signup',googleSignup);



module.exports = router;
