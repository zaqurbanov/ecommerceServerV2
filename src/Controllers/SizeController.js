

const generateResult = require('../helpers/resultGenerator');
const SizeModel = require('../Models/SizeModel');
const baseService = require('../Services/baseService');



const getAllSize = async (req,res)=>{
        const result = await baseService.getAllData(SizeModel)
        generateResult(res,result)



}

const createSize = async(req,res)=>{

    const {name,description} = req.body

    const data = {
        name,
        description
    }
    const result = await baseService.createData(SizeModel,data)

    generateResult(res,result)

}

const getSizeBySlug = async(req,res)=>{
    const {id} = req.params
    const result =await baseService.getDataBySlug(SizeModel,id);

    generateResult(res,result)


}

const deleteSizeById = async(req,res)=>{
    const {id} = req.params

    const result = await baseService.deleteDataById(SizeModel,id);
    generateResult(res,result)
}


const updateSizeById = async(req,res)=>{
    const {id} = req.params
    const {name,description} = req.body;

    const data = {
        name,
        description
    }
    const result = await baseService.updateDataById(SizeModel,data,id)
    generateResult(res,result)

}
module.exports = {
    getAllSize,
    createSize,
    getSizeBySlug,
    deleteSizeById,
    updateSizeById
}