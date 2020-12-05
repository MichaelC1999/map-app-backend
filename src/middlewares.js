const notFound = (req, res, next) => {
    const error = new Error('Not Found - ${req.originalUrl}')
    res.status(404);
    next(error);
}

const errorHandler = (error, req, res, next) => {
    console.log(error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '404' : error.stack,
    })
}

const cloudinary = async (filePath) => {

    let imagePath = ""
    
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const uploadedResponse = await cloudinary.uploader.upload(filePath, {
            upload_preset: 'dev_setups'
        })
        imagePath = uploadedResponse.url
        

    } catch(err) {
        const error = new Error(err)
        throw error
    }
    
    return imagePath;
}

module.exports = {
    notFound,
    errorHandler,
    cloudinary
}