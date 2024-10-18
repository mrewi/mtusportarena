const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const router = express.Router();

// Multer config for file handling
const upload = multer({ storage: multer.memoryStorage() });

// Image upload route
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = Date.now() + '-' + file.originalname;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (error) => {
      res.status(500).json({ message: 'Error uploading file', error });
    });

    stream.on('finish', async () => {
      // Make the file publicly accessible
      await fileUpload.makePublic();

      // Get the public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
    //   const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      res.status(200).json({ imageUrl: publicUrl });
    });

    stream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error });
  }
});

module.exports = router;
