const { MAILGUN_API_KEY } = require("../config/environment");
const HTTP_CODE = require("../config/HTTP_CODE");
const messages = require("../config/Messages");
const Response = require("../config/Response");
const getCatchError = require("../helpers/catchErrorGenerator");
const SubscribeModel = require("../Models/SubscribeModel");
const MailGun = require('mailgun-js')


const mailgun = new MailGun({ apiKey: MAILGUN_API_KEY, domain: "sandbox9477a6421c1b4f2d8e834c599b3c84d1.mailgun.org" });


    const createSubscribe = async(email)=>{
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
        try {
            if(!emailPattern.test(email))
                return Response.error("Please write a correct  Email",null,400)

            const isEamil = await SubscribeModel.findOne({email})
        console.log(isEamil);
            if(isEamil){

                return Response.error("this email already exists in the database",null,404)

            }

            const result = await SubscribeModel.create({email})

            return Response.success(messages.post.success,result,HTTP_CODE.success.created)
                
                

            } catch (error) {
                
                return getCatchError(error.message)
            }

    }

    const getAllEmails = async()=>{

try {
        const result = await SubscribeModel.find()

        return Response.success(messages.get.success,result,HTTP_CODE.success.ok)

} catch (error) {
    return getCatchError(error.message)
}
    }
 
    const deleteEmailById = async(id)=>{
try {
    const result  = await SubscribeModel.findByIdAndDelete(id)
    if(result)
    return Response.success(messages.delete.success,null,HTTP_CODE.success.ok)
    
} catch (error) {
    return getCatchError(error.mesasge)
}

    }

    const sendEmails= async(data,emails)=>{

        try {

      const sendData = {
        from: "Zaur From Ecommerce web site <postmaster@sandbox1234567890abcdef.mailgun.org> ",
        to:emails.join(','),
        subject:data.title,
        text:data.message
      }
            const result = await  mailgun.messages().send(sendData)

            if(!result)
                return Response.error("Error sending Email",null,404)

            
            return Response.success("email successfully sent ",result,200)
        } catch (error) {
            console.log(error);
            return getCatchError(error.mesasge)

        } 

    
    }
    module.exports = { 
        createSubscribe,
        getAllEmails,
        deleteEmailById,
        sendEmails
    }