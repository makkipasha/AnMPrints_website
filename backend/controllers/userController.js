const db = require("../config/db");

const getTotalUsers = (req, res) => {
    const query = "SELECT COUNT(*) AS totalUsers FROM users";
    db.query(query, (err, result) => {
        if (err) {
            console.error("❌ Error fetching total users:", err.message);
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        res.json({ totalUsers: result[0].totalUsers });
    });
};

const getRecentUsers = (req, res) => {
    const query = `SELECT id, full_name, email, status
                   FROM users 
                   WHERE created_at >= NOW() - INTERVAL 1 DAY 
                   ORDER BY created_at DESC 
                   LIMIT 10`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching recent users:", err.message);
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        if (results.length === 0) {
            return res.json({ users: "No users added recently" });
        }

        res.json({ users: results });
    });
};

const getAllUsers = (req, res) => {
    const query = "SELECT id, full_name, email, status FROM users";

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching all users:", err.message);
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        if (results.length === 0) {
            return res.json({ users: "No users found" });
        }

        res.json({ users: results });
    });
};

module.exports = { getTotalUsers, getRecentUsers, getAllUsers };
