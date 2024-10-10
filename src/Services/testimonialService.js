const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/Messages")
const Response = require("../config/Response")
const getCatchError = require("../helpers/catchErrorGenerator")
const ProductModel = require("../Models/ProductModel")
const TestimonialModel = require("../Models/TestimonialModel")




const createTestimonial = async (userId, productId, rating, title, comment) => {

    try {
        const product = await ProductModel.findById(productId)
        if (!product)
            return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)

        let isRating = Number(rating)



        if (isNaN(isRating))
            return Response.error(messages.typeNumber, null, HTTP_CODE.client_error.bad_request)

        // if(title=="" || comment=="" || !title || !comment )
        //     return Response.error(messages.post.error,null,HTTP_CODE.client_error.bad_request)


        const testimonial = {
            userId,
            productId,
            rating: isRating,
            title,
            comment
        }

        const result = await TestimonialModel.create(testimonial)
        return Response.success(messages.post.success, result, HTTP_CODE.success.ok)
    } catch (error) {

        return getCatchError(error.message)
    }


}

const getAllTestimonials = async (query, dataLimit) => {

    try {

        const result = (await TestimonialModel.find(query).populate('userId productId').limit(dataLimit)).reverse()

        return Response.success(messages.get.success, result, HTTP_CODE.success.ok)


    } catch (error) {

        return getCatchError(error.message)

    }
}

// id ye gore her hansi bir comment
const getTestimonialsById = async (id) => {
    try {
        const result = await TestimonialModel.findById(id).populate("userId productId")

        if (!result)
            return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)

        return Response.success(messages.get.success, result, HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)

    }
}


//her hansi userin butun commentleri
// const getAllTestimonialsByUserId = async(userId)=>{


//     try {

//         const result  = await TestimonialModel.find({userId:userId})
//         return Response.success(messages.get.success,result,HTTP_CODE.success.ok)
//     } catch (error) {
//         return getCatchError(error.message,res)

//     }
// }


// her hansi producta yazilan butun Commentler
// const getAllTestimonialsByProductId = async(productId)=>{

//     try {
//         const result  = await TestimonialModel.find({productId})
//         return Response.success(messages.get.success,result,HTTP_CODE.success.ok)
//     } catch (error) {
//         return getCatchError(error.message,res)

//     }
// }

// admin ve user ancaq oz commentlerini sile biler
const deleteTestimonial = async (id, user) => {


    try {
        
        const data = await TestimonialModel.findById(id)
        if (data.userId !== user.id && user.role.role !== "admin")
            return Response.error(messages.get.error, null, HTTP_CODE.client_error.forbidden)


        const result = await TestimonialModel.findByIdAndDelete(id)
        return Response.success(messages.delete.success,result, HTTP_CODE.success.ok)

    } catch (error) {
        
        return getCatchError(error.message)

    }
}

    const changeStatusTestimonials = async (id, status) => {

        try {
            const data = await TestimonialModel.findById(id)

            if (!data)
                return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)

            
            let change = status == 1 ? true : false
            


            const result = await TestimonialModel.findByIdAndUpdate(id, { status: change }, { new: true })

            return Response.success(messages.post.success, result, HTTP_CODE.success.ok)
        } catch (error) {
            return getCatchError(error.message)
                 
        }
    }
const getTestimonialStatsByProduct = async (id) => {


    try {
        const getAllTestimonialsByProductId = await TestimonialModel.find({ productId: id })
        const result = {}
        const getAllRating = getAllTestimonialsByProductId.map(item => {
            return item.rating
        })

        let total = 0
        if (getAllTestimonialsByProductId) {
            const getTotal5 = getAllTestimonialsByProductId.filter(item=>+item.rating ==5)
            const getTotal4 = getAllTestimonialsByProductId.filter(item=> +item.rating ==4)

            const getTotal3 = getAllTestimonialsByProductId.filter(item=>item.rating==3)
            const getTotal2 = getAllTestimonialsByProductId.filter(item=>item.rating==2)

            const getTotal1 = getAllTestimonialsByProductId.filter(item=>item.rating==1)
            result.totalTestimonials = getAllTestimonialsByProductId.length
            getAllRating.forEach(item => total += item)
            result.totalAvarage = total / getAllRating.length
            result.total5 = getTotal5.length || 0
            result.total4 = getTotal4.length ||0
            result.total3 = getTotal3.length ||0
            result.total2 = getTotal2.length || 0
            result.total1 = getTotal1.length || 0
            return Response.success(messages.get.success, result, HTTP_CODE.success.ok)
        }

        return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)


    } catch (error) {
        return getCatchError(error.message)
    }

}
module.exports = {
    createTestimonial,
    getAllTestimonials,
    getTestimonialsById,
    // getAllTestimonialsByUserId,
    // getAllTestimonialsByProductId,
    deleteTestimonial,
    changeStatusTestimonials,
    getTestimonialStatsByProduct



}