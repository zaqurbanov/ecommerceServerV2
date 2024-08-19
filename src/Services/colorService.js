const HTTP_CODE = require("../config/HTTP_CODE");
const messages = require("../config/Messages");
const Response = require("../config/Response");
const getCatchError = require("../helpers/catchErrorGenerator");
const getCreateSlug = require("../helpers/slugCreator");
const ColorModel = require("../Models/ColorModel")

const getAllColor = async ()=>{

    try {
        
        const data = await ColorModel.find();

        if(data.length ==0)
            return Response.success(messages.get.error, data,HTTP_CODE.success.ok);

        return Response.success(messages.get.success,data,HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error)
    }

}

const createColor = async (data)=>{
        const {name,description} = data

        try {
                if(name=="" || !name)
                    return Response.error(messages.post.error,null,HTTP_CODE.client_error.not_found)

                const createSlug = getCreateSlug(name);

                const newData = {
                    name,
                    description
                }


        } catch (error) {
            getCatchError(error)
        }

}

module.exports = {
    getAllColor,
    createColor
}