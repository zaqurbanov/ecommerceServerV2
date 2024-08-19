



const generateResult = require('../helpers/resultGenerator');
const productService = require('../Services/productService');




const getAllProduct = async(req,res)=>{
    const result = await productService.getAllProduct()
    generateResult(res,result)

}

const createProduct = async (req,res)=>{

    const {name,price,description,brand,category,colors,sizes,stock,images}=req.body
    const data = {
        name,
        price,
        description,
        brand,
        category,
        colors,
        sizes,
        stock,
        images
    }
    const result = await productService.createProduct(data)

    generateResult(res,result)
}

const getProductById  = async (req,res)=>{
    const {id} = req.params
    const result = await productService.getProductById(id)
    
    generateResult(res,result)
}

const updateProductById = async (req,res)=>{
    const {id} = req.params;
    const {name,price,description,brand,category,colors,sizes,stock,images}=req.body
    const data = {
        name,
        price,
        description,
        brand,
        category,
        // colors,
        sizes,
        stock,
        // images
    }
    const result = await productService.updateProductById(id,data)

    generateResult(res,result)
}

    
const deleteProductById = async(req,res)=>{
    const {id} = req.params
    const result = await productService.deleteProductById(id)
    generateResult(res,result)
    
}
module.exports = {
    getAllProduct,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
}