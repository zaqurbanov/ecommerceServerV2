const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_API_SECRET } = require('../config/envoirment')
const HTTP_CODE = require('../config/HTTP_CODE')
const messages = require('../config/Messages')
const Response = require('../config/Response')
const getCatchError = require('../helpers/catchErrorGenerator')
const multer = require('multer');


const ImageModel = require('../Models/ImageModel')
const ProductModel = require('../Models/ProductModel')

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:CLOUDINARY_NAME,
    api_key:CLOUDINARY_KEY,
    api_secret:CLOUDINARY_API_SECRET   
})




const addImageToProduct = async ({url,alt,productId,colorId,isPrimary})=>{
    try {
            const product = await ProductModel.findById(productId)
            if(!product)
                return Response.error('Product Not Found',null,HTTP_CODE.client_error.bad_request)

            const newImage = {
                url,
                alt,
                product:productId,
                color:colorId,
                isPrimary
            }

            const createImg = await ImageModel.create(newImage)

            if(!createImg)
                return Response.error(messages.post.error,null,HTTP_CODE.client_error.bad_request)

            return Response.success(messages.post.success,createImg,HTTP_CODE.success.ok)
    } catch (error) {
        getCatchError(error)
    }


}




module.exports = {
    addImageToProduct
}