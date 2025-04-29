const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productsRoutes = require("./routes/productsRoutes");
const accessoryRoutes = require("./routes/accessoryRoutes");
const accessoriesCustomizeRoutes = require("./routes/accessoriesCustomizeRoutes");  // Ensure this path is correct
const merchandiseRoutes = require("./routes/merchandiseRoutes");
const multer = require("multer");
const path = require("path");
const bannerRoutes = require('./routes/bannerRoutes');
const cartRoutes = require("./routes/cartRoutes");
const db = require("./config/db"); 
const mergedImageRoutes = require("./routes/uploadMergedImage");
const uploadRoutes = require("./routes/upload");
const headlineRoutes = require('./routes/headlineRoutes');
const couponRoutes = require('./routes/couponRoutes');
const blogRoutes = require('./routes/blogRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const searchRoute = require('./routes/search');





// ✅ Initialize the app FIRST
dotenv.config();
const app = express();
app.use(express.json());
// app.use('/uploads', express.static('uploads', {
//     setHeaders: (res, path, stat) => {
//       res.set('Access-Control-Allow-Origin', '*');
//     }
//   }));
  
// app.use(express.static("uploads")); // Serve uploaded images

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads"),
    {
      setHeaders: (res, path, stat) => {
        res.set("Access-Control-Allow-Origin","*");
      },
      // fallthrough: true by default, so missing‐file → next()
    }
  )
);



// ✅ Apply CORS
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ Use body-parser before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api", uploadRoutes);

app.use("/api", require("./routes/uploadMergedImage"));  // ✅ No /api in the router file


// ✅ Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});


const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extname) {
            return cb(null, true);
        } else {
            cb(new Error("Only images are allowed"), false);
        }
    }
});


app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Static admin credentials
  if (email === "admin@123" && password === "admin") {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});


app.use('/api', reviewRoutes);


app.use("/api/accessories", accessoryRoutes);



app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // Generate a new filename with the original extension
    const fileExtension = path.extname(req.file.originalname);
    const newFileName = `combined-image-${Date.now()}${fileExtension}`;
    const newFilePath = path.join(__dirname, 'uploads', newFileName);
  
    // Rename the uploaded file
    fs.rename(req.file.path, newFilePath, (err) => {
      if (err) {
        return res.status(500).send('Error saving file.');
      }
      // Return the file path
      res.json({ fileName: newFileName });
    });
  });
// ✅ Error handling middleware for multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }
    next();
});
app.use("/api", cartRoutes);

app.use("/api/accessories", accessoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/accessories-customize", accessoriesCustomizeRoutes);
app.use("/api/merchandise", merchandiseRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/headlines', headlineRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api', blogRoutes);
app.use('/api', searchRoute);





// ✅ Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






