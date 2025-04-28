const db = require("../config/db");
exports.getHeadlines = (req, res) => {
    db.query('SELECT * FROM headlines WHERE status = 1', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};


exports.createHeadline = (req, res) => {
    const { text } = req.body;
    db.query('INSERT INTO headlines (text) VALUES (?)', [text], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, text });
    });
};

exports.updateHeadline = (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    db.query('UPDATE headlines SET text = ? WHERE id = ?', [text, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Updated successfully');
    });
};

exports.deleteHeadline = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM headlines WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Deleted successfully');
    });
};

exports.toggleHideHeadline = (req, res) => {
    const { id } = req.params;
    const { is_hidden } = req.body;
    db.query('UPDATE headlines SET is_hidden = ? WHERE id = ?', [is_hidden, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Visibility updated');
    });
};

exports.updateHeadlineStatus = (req, res) => {
    const { id } = req.params;
  
    // Get current status
    db.query('SELECT status FROM headlines WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).json({ message: 'Headline not found' });
  
      const currentStatus = results[0].status;
      const newStatus = currentStatus === 1 ? 0 : 1;
  
      // Update to toggled status
      db.query('UPDATE headlines SET status = ? WHERE id = ?', [newStatus, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Status updated', status: newStatus });
      });
    });
  };
  
