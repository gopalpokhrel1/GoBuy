const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the destination directory for uploads
const uploadDirectory = path.join(__dirname, '../public/temp');

// Ensure that the upload directory exists, create it if it doesn't
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Export Multer middleware
exports.upload = multer({ storage: storage });
