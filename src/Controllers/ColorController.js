const generateResult = require('../helpers/resultGenerator');
const ColorModel = require('../Models/ColorModel');
const baseService = require('../Services/baseService');

const getAllColor = async (req,res)=>{

        const result  = await baseService.getAllData(ColorModel)
        generateResult(res,result)

}

const createColor = async(req,res)=>{
    
}

module.exports = {
    getAllColor
}