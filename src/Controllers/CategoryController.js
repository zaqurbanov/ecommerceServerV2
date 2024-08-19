const express = require('express');
const baseService = require('../Services/baseService')
const generateResult = require('../helpers/resultGenerator');
const logger = require('../Logger/logger');
const CategoryModel = require('../Models/CategoryModel');



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
        
        const result = await baseService.createData(CategoryModel,data)
        
        if(result.succces){
            logger.info(`Created Data : ${JSON.stringify(result)}`)
        }else{
            logger.warn(`Data can not created ${result.message} : ${JSON.stringify(result)}`)
        }

        return generateResult(res,result)

}

const getCategoryBySlug = async (req,res)=>{

const {slug }= req.params
    const result = await baseService.getDataBySlug(CategoryModel,slug)

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
module.exports = {
    getAllCategory,
    createCategory,
    getCategoryBySlug,
    deleteCategoryById,
    updateCategoryById
}