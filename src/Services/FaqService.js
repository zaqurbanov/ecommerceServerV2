const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/Messages")
const Response = require("../config/Response")
const getCatchError = require("../helpers/catchErrorGenerator")
const FaqModel = require("../Models/FaqModel")



const createFaq = async(answer,question,userId)=>{


    try {
        
        const result  = await FaqModel.create({
            question,
            answer,
            userId

        })

        return Response.success(messages.post.success,result,HTTP_CODE.success.created)
    } catch (error) {
        return getCatchError(error.message)
    }
}
const updateFaq = async (answer,question,id)=>{


    try {
        const faq = await FaqModel.findById(id)
            if(!faq)
                return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)

            
            const updatedAnswer = answer.length>0 ? answer : faq.answer
            const updatedQuestion = question.length>0 ? question : faq.question

            const result  = await FaqModel.findByIdAndUpdate(id,{
                answer:updatedAnswer,
                question:updatedQuestion
            },{new:true})

            return Response.success(messages.post.success,result,HTTP_CODE.success.created)
    } catch (error) {
 return getCatchError(error.message)
    }
}

const getFaqById = async(id)=>{
    try {
        const result  = await FaqModel.findById(id)
        if(!result)
            return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)
        return Response.success(messages.get.success,result,HTTP_CODE.success.ok) 
    } catch (error) {
        return getCatchError(error.message)
    }
}

const getAllFaqs = async ()=>{
        try {
            const result = await FaqModel.find()
            
            return Response.success(messages.get.success,result,HTTP_CODE.success.ok)
        } catch (error) {
            return getCatchError(error.message)
        }
}

const deleteFaqById = async(id)=>{
    try {
        const result =await FaqModel.findByIdAndDelete(id) 
        if(!result)
        return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)
        return Response.success(messages.delete.success,result,HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)

    }
}
module.exports = {
    createFaq,
    updateFaq,
    getFaqById,
    getAllFaqs,
    deleteFaqById

}