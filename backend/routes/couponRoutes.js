const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

router.post('/', couponController.createCoupon);
router.get('/', couponController.getCoupons);
router.get('/:id', couponController.getCoupon);
router.put('/:id', couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);
router.post('/apply', couponController.applyCoupon);

module.exports = router;
