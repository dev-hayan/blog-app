const multer = require("multer");
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});

module.exports = { cloudinary, uploader }