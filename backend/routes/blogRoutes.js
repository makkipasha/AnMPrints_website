const db = require("../config/db");
const express = require("express");
const router = express.Router();  //


router.post('/blogs', (req, res) => {
    const { title, description } = req.body;
  
    const query = 'INSERT INTO blogs (title, description) VALUES (?, ?)';
    db.query(query, [title, description], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add blog' });
      }
      res.status(201).json({ message: 'Blog added successfully', id: result.insertId });
    });
  });
  
  // Get all blogs
  router.get('/blogs', (req, res) => {
    const query = 'SELECT * FROM blogs ORDER BY created_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch blogs' });
      }
      res.status(200).json(results);
    });
  });
  
  // Get a single blog by ID
  router.get('/blogs/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'SELECT * FROM blogs WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch blog' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.status(200).json(result[0]);
    });
  });
  
  // Update a blog
  router.put('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    const query = 'UPDATE blogs SET title = ?, description = ? WHERE id = ?';
    db.query(query, [title, description, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update blog' });
      }
      res.status(200).json({ message: 'Blog updated successfully' });
    });
  });
  
  // Delete a blog
  router.delete('/blogs/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM blogs WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete blog' });
      }
      res.status(200).json({ message: 'Blog deleted successfully' });
    });
  });
  
  module.exports = router;