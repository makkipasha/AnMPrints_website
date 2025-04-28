const db = require("../config/db");

exports.createCoupon = (req, res) => {
  const { code, type, value, min_cart_value, description } = req.body;

  db.query('INSERT INTO coupons SET ?', {
    code,
    type,
    value,
    min_cart_value,
    description
  }, (err, result) => {
    if (err) {
      console.error('Coupon Creation Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Coupon created successfully',
      couponId: result.insertId,
      coupon: { code, type, value, min_cart_value, description }
    });
  });
};

  
  
exports.getCoupons = (req, res) => {
    db.query('SELECT * FROM coupons', (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  };
  
  // Get Single Coupon by ID
  exports.getCoupon = (req, res) => {
    db.query('SELECT * FROM coupons WHERE id = ?', [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(404).json({ error: 'Coupon not found' });
      res.json(result[0]);
    });
  };
  
  // Update Coupon
  exports.updateCoupon = (req, res) => {
    const { code, type, value, min_cart_value, description } = req.body;
  
    db.query('UPDATE coupons SET ? WHERE id = ?', [{
      code, type, value, min_cart_value, description
    }, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Coupon updated successfully' });
    });
  };
  
  // Delete Coupon
  exports.deleteCoupon = (req, res) => {
    db.query('DELETE FROM coupons WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Coupon deleted successfully' });
    });
  };
  
  // Apply Coupon
  exports.applyCoupon = (req, res) => {
    const { code, cartTotal } = req.body;
  
    db.query('SELECT * FROM coupons WHERE code = ?', [code], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(404).json({ error: 'Coupon not found' });
  
      const coupon = result[0];
  
      if (cartTotal < coupon.min_cart_value) {
        return res.status(400).json({ error: `Cart value must be at least ₹${coupon.min_cart_value}` });
      }
  
      let discount = 0;
      if (coupon.type === 'fixed') {
        discount = coupon.value;
      } else if (coupon.type === 'percentage') {
        discount = (coupon.value / 100) * cartTotal;
      }
  
      const totalAfterDiscount = cartTotal - discount;
  
      res.json({
        message: 'Coupon applied successfully',
        discount,
        totalAfterDiscount
      });
    });
  };