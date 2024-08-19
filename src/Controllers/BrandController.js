

const generateResult = require('../helpers/resultGenerator');
const baseService = require('../Services/baseService');
const BrandModel = require('../Models/BrandModel');



const getAllBrand = async (req, res) => {
    const result = await baseService.getAllData(BrandModel)
    generateResult(res, result)

}


const createBrand = async (req, res) => {

    const { name, description } = req.body
    const data = {
        name,
        description
    }
    const result = await baseService.createData(BrandModel,data)
    generateResult(res, result)

}

const getBrandBySlug = async (req, res) => {

    const { slug } = req.params
    const result = await baseService.getDataBySlug(BrandModel,slug)

    generateResult(res, result)

}



const deleteBrandById = async (req, res) => {
    const { id } = req.params

    const result = await baseService.deleteDataById(BrandModel,id)
    
    generateResult(res, result)
}

const updateBrandById = async (req,res)=>{
    const {id} = req.params
    const {name,description} = req.body
     
    const data = {
        name,
        description
    }
   
    const result = await baseService.updateDataById(BrandModel,data,id)
    return generateResult(res,result)
}

module.exports = {
    getAllBrand,
    getBrandBySlug,
    deleteBrandById,
    createBrand,
    updateBrandById
}