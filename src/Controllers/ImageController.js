

const generateResult = require('../helpers/resultGenerator')
const imageService = require('../Services/imageService')


const addImageToProduct = async(req,res) =>{

        const {url,alt,productId,colorId,isPrimary} = req.body
           const result = await  imageService.addImageToProduct(url,alt,productId,colorId,isPrimary)
            return generateResult(res,result)
}

module.exports = {
    addImageToProduct
}