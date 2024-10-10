

const generateResult = require('../helpers/resultGenerator')
const ImageModel = require('../Models/ImageModel')
const imageService = require('../Services/imageService')
const baseService = require('../Services/baseService')


const addImageToProduct = async(req,res) =>{

        const {productId,sizeId} = req.body
        const {images} = req.files;
        
           const result = await  imageService.addImageToProduct(productId,sizeId,images)
             generateResult(res,result) 
}

const getAllImages =async (req,res)=>{
        const result = await imageService.getAllImage()

         generateResult(res,result)
}

const deleteImg  = async(req,res)=>{
                const {id} = req.params
        const result = await imageService.deleteImageById(id)

        generateResult(res,result)
}
module.exports = {
    addImageToProduct,
    getAllImages,
    deleteImg
}

// product id 66c2e71c332f145db480896d
//color id 66c598bdaaa2990f85c35b46  66c598b1aaa2990f85c35b43  