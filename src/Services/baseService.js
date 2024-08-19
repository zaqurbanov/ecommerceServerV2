const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/Messages")
const Response = require("../config/Response")
const getCatchError = require("../helpers/catchErrorGenerator")
const getCreateSlug = require("../helpers/slugCreator")
const ProductTypeModel = require("../Models/ProductTypeModel")


const getAllData = async(model)=>{

    try {
        const data = await model.find()
    if(data.length==0)
      return  Response.success(messages.get.error,data,HTTP_CODE.success.ok)
    
        return Response.success(messages.get.success,data,HTTP_CODE.success.ok)
    
    } catch (error) {
        return getCatchError(error)
    }

}

const createData = async (model,data) =>{
    const {name,description} = data
    try {
        if(name=="" || !name)
            return Response.error(messages.post.error,null,HTTP_CODE.client_error.not_found)
        const createSlug = getCreateSlug(name)
        const newData = {
            name,
            description,
            slug:createSlug
        }

        const isExsistData = await model.findOne({slug:newData.slug})
        if(isExsistData){
            
            return Response.error(` "  ${name} "  already exists`,null,HTTP_CODE.client_error.bad_request) 

        }

             const result = await model.create(newData)
        if(result)
            return Response.success(messages.post.success,result,HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error)
    }
 
}
const getDataBySlug = async(model,slug)=>{
    
    try {
        const data = await model.findOne({slug})
        

if(!data)
    return Response.error(messages.get.error,messages.get.error,HTTP_CODE.client_error.bad_request)

    return Response.success(messages.get.success,data,HTTP_CODE.success.ok)
} catch (error) {
    return getCatchError(error)

}
}

const deleteDataById =async (model,id)=>{

        
    try {
        const data = await model.findById(id)
        if(!data)
            return Response.error(messages.get.error,messages.delete.error,HTTP_CODE.client_error.bad_request)

        const deletedData = await model.findByIdAndDelete(id);

        if(!deletedData)
            return Response.error(messages.delete.error,null,HTTP_CODE.client_error.bad_request)

        return Response.success(messages.delete.success,null,HTTP_CODE.success.ok)
} catch (error) {
    return getCatchError(error)
}


}
const updateDataById = async(model,data,id)=>{


    try {
            const {name,description} = data
            const category = await model.findById(id)
            
            if(!category)
                return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)

            const updatedName = category.name ==name ? category.name : name
            const updatedDescription = category.description == description ? category.description : description

            const updatedData = {
                name:updatedName,
                description:updatedDescription,
                slug:getCreateSlug(updatedName)
            }
            const update = await model.findByIdAndUpdate(id,updatedData)
                
            if(!update)
                return Response.error(messages.updated.error,null,HTTP_CODE.client_error.method_not_allowed)

            return Response.success(messages.updated.success,update,HTTP_CODE.success.created)

    } catch (error) {
        return getCatchError(error)
    }
}

module.exports = {
    getAllData,
    createData,
    getDataBySlug,
    deleteDataById,
    updateDataById
} 