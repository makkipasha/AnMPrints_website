const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.post('/reviews', ReviewController.postReview);
router.get('/reviews', ReviewController.getUserReviews);
router.get('/reviews/:product_code', ReviewController.getReviewsByProductCode);
router.get('/review/all', ReviewController.getAllReviews);
   // ✅ This is public
module.exports = router;
