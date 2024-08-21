const generateResult = require('../helpers/resultGenerator');
const ColorModel = require('../Models/ColorModel');
const baseService = require('../Services/baseService');

const getAllColor = async (req,res)=>{

        const result  = await baseService.getAllData(ColorModel)
        generateResult(res,result)

}

const createColor = async(req,res)=>{
        const {name,description} =req.body 
        const data = {
            name,
            description
        }
        const result  = await baseService.createData(ColorModel,data)   
        generateResult(res,result)
    }

   const deleteColorById = async(req,res)=>{
    const {id} = req.params

    const result  = await baseService.deleteDataById(ColorModel,id)
    generateResult(res,result)


   }

   const updateColorById = async(req,res)=>{

    const {id} = req.params
    const {name,description} = req.body
     
    const data = {
        name,
        description
    }
   
    const result = await baseService.updateDataById(ColorModel,data,id)
    return generateResult(res,result)
}
module.exports = {
    getAllColor,
    createColor,
    deleteColorById,
    updateColorById

}