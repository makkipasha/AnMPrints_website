const db = require("../config/db");
const jwt = require('jsonwebtoken');

exports.postReview = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { product_code, review, rating } = req.body;

    if (!product_code || !review || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if product_code exists in either products or accessories
    const checkQuery = `
      SELECT product_code FROM products WHERE product_code = ?
      UNION
      SELECT product_code FROM accessories WHERE product_code = ?
    `;

    db.query(checkQuery, [product_code, product_code], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: 'Product code not found in products or accessories' });
      }

      // Check if review already exists for this user and product
      const checkDuplicate = `
        SELECT * FROM reviews WHERE user_id = ? AND product_code = ?
      `;
      db.query(checkDuplicate, [userId, product_code], (err, duplicateResults) => {
        if (err) return res.status(500).json({ error: err.message });

        if (duplicateResults.length > 0) {
          return res.status(409).json({ message: 'You have already submitted a review for this product' });
        }

        // Insert review
        const insertQuery = `
          INSERT INTO reviews (user_id, product_code, review, rating, created_at)
          VALUES (?, ?, ?, ?, NOW())
        `;
        db.query(insertQuery, [userId, product_code, review, rating], (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: 'Review submitted successfully' });
        });
      });
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


exports.getReviewsByProductCode = (req, res) => {
    const { product_code } = req.params;
  
    if (!product_code) {
      return res.status(400).json({ message: 'Product code is required' });
    }
  
    const query = `
      SELECT r.id, r.user_id, r.product_code, r.review, r.rating, r.created_at
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_code = ?
      ORDER BY r.created_at DESC
    `;
  
    db.query(query, [product_code], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No reviews found for this product' });
      }
  
      res.status(200).json({ reviews: results });
    });
  };
  

  exports.getUserReviews = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      const getQuery = `
        SELECT r.id, r.product_code, r.review, r.rating, r.created_at
        FROM reviews r
        WHERE r.user_id = ?
        ORDER BY r.created_at DESC
      `;
  
      db.query(getQuery, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
  
        res.status(200).json({
          message: 'User reviews fetched successfully',
          reviews: results,
        });
      });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
  

  exports.getAllReviews = (req, res) => {
    const query = `
      SELECT r.id, r.user_id, r.product_code, r.review, r.rating, r.created_at
      FROM reviews r
      ORDER BY r.created_at DESC
    `;
  
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No reviews found' });
      }
  
      res.status(200).json({
        message: 'All reviews fetched successfully',
        reviews: results,
      });
    });
  };
  