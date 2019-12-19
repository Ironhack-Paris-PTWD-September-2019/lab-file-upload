const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_NAME,
  // api_key: process.env.CLOUDINARY_KEY,
  // api_secret: process.env.CLOUDINARY_SECRET
  cloud_name: "dkwcrwudm",
  api_key: "375254266881714",
  api_secret: "YpQHsDzDkg2xwwpuYtYGxQul3JQ"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'lab-file-upload', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;