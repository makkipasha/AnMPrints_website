// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const authenticateJWT = require("../middlewares/authMiddleware");


router.post("/add", authenticateJWT, cartController.addToCart);
router.delete("/remove/:id", authenticateJWT, cartController.removeFromCartById);
router.get("/cartdata", authenticateJWT, cartController.getCart);
router.put("/update-quantity/:id", authenticateJWT, cartController.updateQuantityInCart);
router.get("/cart-summary", authenticateJWT, cartController.getCartSummary);
router.get("/cart/all", cartController.getAllCartData);



module.exports = router;