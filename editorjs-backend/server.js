const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 8008;

app.use(bodyParser.json());

// Endpoint to handle image URL upload
app.post('/fetchUrl', async (req, res) => {
  const { url } = req.body;
  console.log('Received image URL:', url);

  try {
    // Fetch image data from URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    // Read image data as buffer
    const imageBuffer = await response.buffer();

    // Determine file extension (e.g., .jpg, .png)
    const contentType = response.headers.get('content-type');
    const fileExtension = contentType.split('/')[1]; // Extract file extension

    // Generate a unique filename
    const fileName = `image_${Date.now()}.${fileExtension}`;

    // Path to store uploaded images (create this directory if it doesn't exist)
    const uploadPath = path.join(__dirname, 'uploads');
    await fs.mkdir(uploadPath, { recursive: true }); // Create directory if not exists

    // Write image buffer to local file
    const imagePath = path.join(uploadPath, fileName);
    await fs.writeFile(imagePath, imageBuffer);

    console.log('Image saved:', imagePath);

    // Respond with success message or additional data if needed
    res.status(200).json({ success: true, message: 'Image saved successfully', imagePath });
  } catch (error) {
    console.error('Error fetching and saving image:', error);
    res.status(500).json({ success: false, error: 'Failed to save image' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
