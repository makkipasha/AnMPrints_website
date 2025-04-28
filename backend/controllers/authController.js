const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const tokenBlacklist = [];

const client = new OAuth2Client("647246143262-4kth0ruauur8djasicj2emobh3ljfmds.apps.googleusercontent.com");

exports.googleAuth = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required." });
    }

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // Check if user already exists
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            if (err) return res.status(500).json({ message: "Database error." });

            if (result.length > 0) {
                // User exists, log them in
                const user = result[0];
                const jwtToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });

                return res.status(200).json({ message: "Login successful!", token: jwtToken });
            } else {
                // User doesn't exist, register them (password set to NULL for Google users)
                db.query(
                    "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
                    [name, email, null],
                    (err, result) => {
                        if (err) return res.status(500).json({ message: "Database error during registration." });

                        const userId = result.insertId;
                        const jwtToken = jwt.sign({ id: userId, email }, "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", {
                            expiresIn: "1h",
                        });

                        return res.status(201).json({ message: "Signup successful!", token: jwtToken });
                    }
                );
            }
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid Google token." });
    }
};

exports.googleSignup = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required." });
    }

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name } = payload;

        // Check if user already exists
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error." });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "User already exists. Please log in instead." });
            }

            // Insert new user
            db.query(
                "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
                [name, email, null],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Database error during signup." });
                    }

                    const userId = result.insertId;
                    const jwtToken = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
                        expiresIn: "1h",
                    });

                    return res.status(201).json({ message: "Signup successful!", token: jwtToken });
                }
            );
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid Google token." });
    }
};






exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if user exists
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            if (err) return res.status(500).json({ message: "Database error." });

            if (result.length === 0) {
                return res.status(401).json({ message: "Invalid email or password." });
            }

            const user = result[0];

            // Check if the user has a password (i.e., not a Google user)
            if (!user.password) {
                return res.status(401).json({ message: "This account uses Google login. Please login with Google." });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password." });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ message: "Login successful!", token });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


exports.register = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if user exists
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            if (result.length > 0) {
                return res.status(400).json({ message: "User already exists." });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into database
            db.query(
                "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
                [fullName, email, hashedPassword],
                (err, result) => {
                    if (err) return res.status(500).json({ message: "Database error." });

                    res.status(201).json({ message: "User registered successfully!" });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};





exports.getProfile = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = parseInt(req.params.id);

        // Check if decoded token's ID matches the requested profile ID
        if (decoded.id !== userId) {
            return res.status(403).json({ message: "Unauthorized access to this profile" });
        }

        db.query("SELECT id, full_name, email FROM users WHERE id = ?", [userId], (err, result) => {
            if (err) return res.status(500).json({ message: "Database error" });

            if (result.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ user: result[0] });
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


exports.logout = (req, res) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(400).json({ message: "No token provided." });
    }

    const cleanedToken = token.replace("Bearer ", "");

    // Add token to blacklist
    tokenBlacklist.push(cleanedToken);

    res.status(200).json({ message: "Logged out successfully." });
};


