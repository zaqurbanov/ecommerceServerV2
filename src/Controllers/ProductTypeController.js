const generateResult = require('../helpers/resultGenerator')
const ProductTypeModel = require('../Models/ProductTypeModel')
const baseService = require('../Services/baseService')
    const getAllProductType = async (req,res)=>{


            const result  = await baseService.getAllData(ProductTypeModel)
            generateResult(res,result)
    }

    const createProductType = async( req,res)=>{

        const {name,description} = req.body
        const data = {
            name,
            description
        }
        const result = await baseService.createData(ProductTypeModel,data)
        generateResult(res,result)

    }

    const getProductTypeBySlug = async(req,res)=>{

        const {slug} = req.params
        const result = await baseService.getDataBySlug(ProductTypeModel,slug)
      
        generateResult(res,result)

    }
 

    const deleteProductTypeById = async (req,res) =>{
        const {id}=req.params 

        const result = await baseService.deleteDataById(ProductTypeModel,id)
        generateResult(res,result)
    }

    const updateProductTypeById = async(req,res)=>{

        const {id} = req.params
        const {name,description} = req.body
         
        const data = {
            name,
            description
        }
       
        const result = await baseService.updateDataById(ProductTypeModel,data,id)
        return generateResult(res,result)
    }
    module.exports = {
        getAllProductType,
        createProductType,
        getProductTypeBySlug,
        deleteProductTypeById,
        updateProductTypeById
    }