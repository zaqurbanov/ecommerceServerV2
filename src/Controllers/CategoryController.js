const express = require('express');
const baseService = require('../Services/baseService')
const generateResult = require('../helpers/resultGenerator');
const logger = require('../Logger/logger');
const CategoryModel = require('../Models/CategoryModel');
const Response = require('../config/Response');



const getAllCategory = async(req,res)=>{

const result = await baseService.getAllData(CategoryModel)

return generateResult(res,result)

}

const createCategory = async(req,res)=>{
        const {name,description} = req.body
        const data = {
            name,
            description
        }
        console.log(data);
        const result = await baseService.createData(CategoryModel,data)
        
        if(result){
            logger.info(`Created Data : ${JSON.stringify(result)}`)
        }else{
            logger.warn(`Data can not created ${result.message} : ${JSON.stringify(result)}`)
        }

        return generateResult(res,result)

}

const getCategoryBySlug = async (req,res)=>{

const {id }= req.params
    const result = await baseService.getDataBySlug(CategoryModel,id)

  return generateResult(res,result)

}

const deleteCategoryById = async (req,res)=>{
    const {id} = req.params
    const result = await baseService.deleteDataById(CategoryModel,id)

    return generateResult(res,result)
} 

const updateCategoryById = async(req,res)=>{

    const {id} = req.params
    const {name,description} = req.body
     
    const data = {
        name,
        description
    }
    
   
    const result = await baseService.updateDataById(CategoryModel,data,id)
    return generateResult(res,result)
}

const getThreeCategory = async(req,res)=>{
        try {
            const getAllCategory = await CategoryModel.find()
            const result = getAllCategory.slice(-3)
            const resultt = Response.success("D",result,200);
            generateResult(res,resultt)
            
        } catch (error) {
                
        }
}
module.exports = {
    getAllCategory,
    createCategory,
    getCategoryBySlug,
    deleteCategoryById,
    updateCategoryById,
    getThreeCategory
}