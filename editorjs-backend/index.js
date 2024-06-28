const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const app = express();
const PORT = process.env.PORT || 8008;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define where to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original file name
  }
});
const upload = multer({ storage: storage });

// Endpoint for uploading image file
app.post('/uploadFile', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  console.log('Received image file:', req.file);
  // Implement logic to process the image file here (e.g., save to storage, manipulate, etc.)

  res.status(200).json({ success: true, message: 'Image file received successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
