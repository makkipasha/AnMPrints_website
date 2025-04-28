const db = require("../config/db");
const multer = require('multer');
const path = require('path');

// Setting up multer for file storage (banner image)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Saving the image with timestamp as the filename
  }
});

const upload = multer({ storage: storage });

const storeBanner = (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? `http://localhost:5005/uploads/${req.file.filename}` : ""; // Full URL
  
    if (!title || !image) {
      return res.status(400).json({ message: "Title and image are required." });
    }
  
    // First, check if a banner already exists in the database
    const checkQuery = `SELECT * FROM banners LIMIT 1`; // Assuming only one banner exists
    db.query(checkQuery, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to check banner." });
      }
  
      if (result.length > 0) {
        // If banner exists, update the banner
        const updateQuery = `UPDATE banners SET image = ?, title = ?, description = ? WHERE id = ?`;
        db.query(updateQuery, [image, title, description, result[0].id], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update banner." });
          }
  
          res.status(200).json({
            message: "Banner updated successfully!",
            banner: { image, title, description }
          });
        });
      } else {
        // If banner doesn't exist, insert a new banner
        const insertQuery = `INSERT INTO banners (image, title, description) VALUES (?, ?, ?)`;
        db.query(insertQuery, [image, title, description], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to store banner." });
          }
  
          res.status(200).json({
            message: "Banner stored successfully!",
            banner: { image, title, description }
          });
        });
      }
    });
  };
  

// Get Banner API (GET)
const getBanner = (req, res) => {
  const query = `SELECT * FROM banners LIMIT 1`; // Assuming there is only one banner
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to retrieve banner." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Banner data not found." });
    }

    const banner = result[0];
    res.status(200).json({
      image: banner.image,
      title: banner.title,
      description: banner.description
    });
  });
};

// Update Banner API (PUT)
const updateBanner = (req, res) => {
  const { title, description = "" } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }
  const image = req.file ? `http://localhost:5005/uploads/${req.file.filename}` : null; // If no new image, keep the existing one

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  // Get the current banner data
  const getQuery = `SELECT * FROM banners LIMIT 1`; // Assuming there's only one banner
  db.query(getQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to get banner data for update." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Banner not found." });
    }

    const currentBanner = result[0];
    const updatedImage = image || currentBanner.image; // Keep the existing image if no new image is provided

    // Update banner data in the database
    const updateQuery = `UPDATE banners SET image = ?, title = ?, description = ? WHERE id = ?`;
    db.query(updateQuery, [updatedImage, title, description, currentBanner.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update banner." });
      }

      res.status(200).json({
        message: "Banner updated successfully!",
        banner: { image: updatedImage, title, description }
      });
    });
  });
};

module.exports = {
  upload,
  storeBanner,
  getBanner,
  updateBanner
};
