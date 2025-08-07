const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// storage setup for cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'linkedin-mini', // name of cloudinary folder
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

// make multer middleware
const upload = multer({ storage });

module.exports = upload;
