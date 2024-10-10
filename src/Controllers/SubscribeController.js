
const generateResult = require('../helpers/resultGenerator')
const subscribeService = require('../Services/subscribeService')


const createSubscribe = async(req,res)=>{
    const {email} = req.body
    
const result  = await  subscribeService.createSubscribe(email)
console.log(result);
    generateResult(res,result)

}


const getAllSubscribe = async(req,res)=>{

    const result  = await subscribeService.getAllEmails()

    generateResult(res ,result)
}

const sendEmails = async(req,res)=>{
const  {data,emails} =req.body

    
    const result  = await subscribeService.sendEmails(data,emails)
    generateResult(res,result)
}
module.exports = {
    createSubscribe,
    getAllSubscribe,
    sendEmails  
}