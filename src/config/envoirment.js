const dotenv = require('dotenv');
dotenv.config();

module.exports = {

    PORT:process.env.PORT,
    MONGO_URL : process.env.MONGO_URL,
    CLOUDINARY_NAME:process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_SECRET :process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_KEY : process.env.CLOUDINARY_KEY
}