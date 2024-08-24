

const generateResult = require('../helpers/resultGenerator')
const ImageModel = require('../Models/ImageModel')
const imageService = require('../Services/imageService')
const baseService = require('../Services/baseService')


const addImageToProduct = async(req,res) =>{

        const {url,alt,productId,colorId,isPrimary} = req.body
        
           const result = await  imageService.addImageToProduct(url,alt,productId,colorId,isPrimary)
             generateResult(res,result) 
}

const getAllImages =async (req,res)=>{
        const result = await imageService.getAllImage()

         generateResult(res,result)
}

const deleteImg  = async(id)=>{
        const result = await baseService.deleteDataById(ImageModel,id)

        generateResult(res,result)
}
module.exports = {
    addImageToProduct,
    getAllImages,
    deleteImg
}

// product id 66c2e71c332f145db480896d
//color id 66c598bdaaa2990f85c35b46  66c598b1aaa2990f85c35b43  