const cloudinary = require('cloudinary')
require('dotenv').config()

module.exports = async (req,res,next) => {
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
          });       
          if(!req.file) {
            throw {name : 'NoFile'}
          }
        const file = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
        const response = await cloudinary.v2.uploader.upload(file)
        req.user.uploadedImgUrl = response.url      
        next()
    } catch (error) {
      console.log(error.message);
        next(error)
    }

}