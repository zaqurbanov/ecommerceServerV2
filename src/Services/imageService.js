const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_API_SECRET } = require('../config/envoirment')
const HTTP_CODE = require('../config/HTTP_CODE')
const messages = require('../config/Messages')
const Response = require('../config/Response')
const getCatchError = require('../helpers/catchErrorGenerator')
const multer = require('multer');


const ImageModel = require('../Models/ImageModel')

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:CLOUDINARY_NAME,
    api_key:CLOUDINARY_KEY,
    api_secret:CLOUDINARY_API_SECRET   
})

//ssdd
const upload = multer({dest:'uploads/'})



const uploadImageToCloudinary = async (filePath,options={})=>{


    try {
        const result = await cloudinary.uploader.upload(filePath,options)

        return Response.success(messages.post.success,result,HTTP_CODE.success.ok)
        

    } catch (error) {
        return getCatchError(error)
    }
}


const createImage = async (data)=>{

    const {url,alt,product,color,isPrimary} = data

    try {
        if(!url || !data)
            return Response.error(messages.post.error,null,HTTP_CODE.client_error.bad_request)

        const newImage = await ImageModel.create(data)
        
        if (!newImage)
            return Response.error(messages.post.error, null, HTTP_CODE.client_error.bad_request);

        return Response.success(messages.post.success,newImage,HTTP_CODE.success.created)
    } catch (error) {
        
    }
}

module.exports = {
    uploadImageToCloudinary,
    createImage
}