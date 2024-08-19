const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/Messages")
const Response = require("../config/Response")
const getCatchError = require("../helpers/catchErrorGenerator")
const getCreateSlug = require("../helpers/slugCreator")
const ProductModel = require("../Models/ProductModel")

const createProduct = async(data)=>{

    //!  images, color modelleri yaranandan sonra elave eolunacaq
    const {name,price,description,brand,category,colors,sizes,stock,inStock,images} = data



    try {
        if(name=="" || !name || price=="" || !price || description =="" || !description || category ==""|| !category || brand=="" || !brand)
            return Response.error(messages.post.error,null,HTTP_CODE.client_error.bad_request);

        const Slug = getCreateSlug(name)

        const isExsistProduct = await ProductModel.findOne({slug:Slug})

        if(isExsistProduct)
            return Response.error(` "  ${name} "  already exists`,null,HTTP_CODE.client_error.bad_request) 

        const create = await ProductModel.create({
            ...data,
            slug:Slug
        })

        if(!create)
            return Response.error(messages.post.error,null,HTTP_CODE.client_error.bad_request)

        return Response.success(messages.post.success,create,HTTP_CODE.success.created)


        
    } catch (error) { 
      return  getCatchError(error)
    }


}

const getAllProduct = async()=>{

    try {
        
        const data = await ProductModel.find().populate('brand category  sizes')

        return Response.success(messages.get.success,data,HTTP_CODE.success.ok)
    } catch (error) {
         return getCatchError(error)
    }
}

const deleteProductById = async (id)=>{
         try {
            
            const deletedProduct = await ProductModel.findByIdAndDelete({_id:id})
            if(!deletedProduct)
                return Response.error(messages.delete.error,null,HTTP_CODE.client_error.not_found)

            return Response.success(messages.delete.success,null,HTTP_CODE.success.ok)
         } catch (error) {
         return   getCatchError(error)
         }
}

const getProductById = async (id)=>{
    try {
        const data = await ProductModel.findById({_id:id}).populate('brand category sizes')

            if(!data)
                return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)

        return Response.success(messages.get.success,data,HTTP_CODE.success.ok)


    } catch (error) {
        return getCatchError(error)
    }
}

const updateProductById = async (id,data)=>{

    try {

        Object.keys(data).forEach(name=>{
            if(data[name]===undefined)
                delete data[name]
        })
     
        const updateProduct = await ProductModel.findByIdAndUpdate(id,data,{new:true})

        return Response.success(messages.updated.success,updateProduct,HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error)
    }

}


module.exports = {
    createProduct,
    getAllProduct,
    deleteProductById,
    getProductById,
    updateProductById


}