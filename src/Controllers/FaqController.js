


const generateResult = require('../helpers/resultGenerator');
const faqService = require('../Services/FaqService')

const createFaq = async(req,res)=>{

    const {answer,question}=req.body
    const userId = req.user.id
    const result =await faqService.createFaq(answer,question,userId);

    generateResult(res,result)
}

const updateFaq = async(req,res)=>{
    const {answer,question} = req.body
    const {id} =req.params 
    const result = await faqService.updateFaq(answer,question,id)
    generateResult(res,result)

}

const getFaqById = async(req,res)=>{
        const {id} = req.params
        const result  = await faqService.getFaqById(id)
        generateResult(res,result)

}

const getAllFaqs = async(req,res)=>{
    const result  = await faqService.getAllFaqs()
    generateResult(res,result)

}

const deleteFaqById = async(req,res)=>{
    const {id} = req.params
    const result = await faqService.deleteFaqById(id)
    generateResult(res,result)

}
module.exports = {
    createFaq,
    updateFaq,
    getFaqById,
    getAllFaqs,
    deleteFaqById


}