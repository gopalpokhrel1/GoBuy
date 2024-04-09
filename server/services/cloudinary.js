const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_SECRET_KEY,
});

exports.uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No local file path provided.");
            return null;
        }

        // Check if the file exists
        if (!fs.existsSync(localFilePath)) {
            console.error("Local file does not exist:", localFilePath);
            return null;
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        return response;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);

        // Remove the file from the server if upload fails
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.error("Error removing local file:", unlinkError);
        }

        return null;
    }
};
