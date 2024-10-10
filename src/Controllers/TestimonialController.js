



const generateResult = require('../helpers/resultGenerator')
const testimonialService = require('../Services/testimonialService')

const createTestimonial = async (req,res) => {
    const userId = req.user.id
    let { productId, rating, title, comment } = req.body


    const result = await testimonialService.createTestimonial(userId,productId,rating,title,comment)

    generateResult(res, result)
}

const getAllTestimonials = async(req,res)=>{
        const {userId,productId,status,limit} = req.query
        const query = {}
        if(userId){
            query.userId = userId
        }

        if(productId){
            query.productId = productId
        }
        if(status){
            query.status = status
        }   
        const dataLimit  = limit ? limit : 500
      
    const result  = await testimonialService.getAllTestimonials(query,dataLimit)
    
    generateResult(res,result)

}

const getTestimonialsById =async(req,res)=>{
    const {id} =req.params 
    const result = await testimonialService.getTestimonialsById(id)
    generateResult(res,result)
}

const deleteTestimonial = async(req,res)=>{

    const {id} = req.params
    
    const result  = await testimonialService.deleteTestimonial(id,req.user)
    generateResult(res,result)

}

const changeStatusTestimonials = async(req,res)=>{
    const {id}  = req.params
        const {status} = req.body
        
         
        const result  = await testimonialService.changeStatusTestimonials(id,status)

        generateResult(res,result)
}
const getTestimonialStatsByProduct = async(req,res)=>{

const {productId} =req.params 
const result = await testimonialService.getTestimonialStatsByProduct(productId)
generateResult(res,result)


}

const getAllTestimonialsStats = (req,res)=>{

}

module.exports = {
    createTestimonial,
    getAllTestimonials,
    getTestimonialsById,
    deleteTestimonial,
    changeStatusTestimonials,
    getTestimonialStatsByProduct
    // getAllTestimonialsByUserId,
    // getAllTestimonialsByProductId
}