const express = require('express');
const router = express.Router();
const db = require("../config/db"); // Ensure db is configured correctly

router.get('/search', (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const sql = `
    SELECT name, description, 'product' AS type 
    FROM products 
    WHERE name LIKE ? OR description LIKE ?
  
    UNION
  
    SELECT name, description, 'accessory' AS type 
    FROM accessories 
    WHERE name LIKE ? OR description LIKE ?
  `;

  const likeQuery = `%${query}%`;
  const values = [likeQuery, likeQuery, likeQuery, likeQuery];

  // Use db.query instead of connection.query
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Search error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ results });
  });
});

module.exports = router;
