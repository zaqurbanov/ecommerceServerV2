const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_API_SECRET } = require('../config/environment')
const HTTP_CODE = require('../config/HTTP_CODE')
const messages = require('../config/Messages')
const Response = require('../config/Response')
const getCatchError = require('../helpers/catchErrorGenerator')
const cloudinary = require('cloudinary').v2

const ImageModel = require('../Models/ImageModel')
const ProductModel = require('../Models/ProductModel')



cloudinary.config({
    cloud_name:CLOUDINARY_NAME,
    api_key:CLOUDINARY_KEY,
    api_secret:CLOUDINARY_API_SECRET   
})




const addImageToProduct = async (productId,sizeId,images)=>{

    const uploadedImages = [];
        
        
    if(images.length<=0){
        return Response.error("Please select a size and upload at least one image",null,HTTP_CODE.client_error.bad_request)
    }
    try {
        if (images.length <= 0) {
            return Response.error("Please select a size and upload at least one image.", null, HTTP_CODE.client_error.bad_request);
        }
     
        
            if (Array.isArray(images)) {
                for (const file of images) {
                    const result = await cloudinary.uploader.upload(file.tempFilePath, {
                        folder: 'ecommerce',
                    });
    
                    const addModel = await ImageModel.create({
                        url: result.secure_url,
                        public_id:result.public_id,
                        product: productId,
                        size: sizeId
                    });
                    
                    uploadedImages.push(addModel);
                }
            } else {
                const result = await cloudinary.uploader.upload(images.tempFilePath, {
                    folder: 'ecommerce',
                });
                    
                const addModel = await ImageModel.create({
                    url: result.secure_url,
                    product: productId,
                    size: sizeId,
                    public_id:result.public_id,
                });
    
                uploadedImages.push(addModel);
            }
            
    
            return Response.success(messages.post.success, uploadedImages, HTTP_CODE.success.ok);
      
    } catch (error) {
      return  getCatchError(error.message)
    }


}


const getAllImage = async()=>{
        try {
            const images = await ImageModel.find()
            if(!images)
                return Response.error(messages.get.error,null,HTTP_CODE.client_error.bad_request)

            return Response.success(messages.get.ok,images,HTTP_CODE.success.ok)

        } catch (error) {
         return getCatchError(error.message)
        }
}

const deleteImageById = async(id)=>{
        try {
            const imageData = await ImageModel.findById(id)
                
if(!imageData){
        return Response.error('Image Not Found',null,HTTP_CODE.client_error.bad_request)
}

const public_id = imageData.public_id;

const result  = await cloudinary.uploader.destroy(public_id);

if (result.result !== 'ok')
    return Response.error("Failed to delete image from Cloudinary", null, HTTP_CODE.server_error.internal_server_error)

        await ImageModel.findByIdAndDelete(id)

        return Response.success(messages.delete.success, null, HTTP_CODE.success.ok)
        } catch (error) {
                return getCatchError(error.message)
        }
}

module.exports = {
    addImageToProduct,
    getAllImage,
    deleteImageById
}