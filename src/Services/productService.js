const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/Messages")
const Response = require("../config/Response")
const getCatchError = require("../helpers/catchErrorGenerator")
const getCreateSlug = require("../helpers/slugCreator")
const ImageModel = require("../Models/ImageModel")
const ProductModel = require("../Models/ProductModel")
const path = require('path')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const createProduct = async (data) => {

    //!  images, color modelleri yaranandan sonra elave eolunacaq
    let { name, price, description, brand, category, colors, sizes, stock, inStock, image,type } = data



    try {
        sizes = sizes && sizes.length > 0 ? sizes : [];

        if (!name  || !price ||  !description ||  !category ||  !brand || !type )
            return Response.error(messages.post.error, null, HTTP_CODE.client_error.bad_request);

            console.log(image);
     
        if (!image) {
            return Response.error('Primary image is required', null, HTTP_CODE.client_error.bad_request);
        } 

        const Slug = getCreateSlug(name)

        const isExsistProduct = await ProductModel.findOne({ slug: Slug })

 
        if (isExsistProduct)
            return Response.error(` "  ${name} "  already exists`, null, HTTP_CODE.client_error.bad_request)
        
       

            const result = await cloudinary.uploader.upload(image.tempFilePath, {
                folder: 'ecommerce'
            })

 
                
            



        const create = await ProductModel.create({
            ...data,
            primaryImage: result.secure_url,
            sizes,
            slug: Slug
        })
        

        if (!create)
            return Response.error(messages.post.error, null, HTTP_CODE.client_error.bad_request)



        return Response.success(messages.post.success, create, HTTP_CODE.success.created)



    } catch (error) {
            console.log(error);
        return getCatchError(error)

    }


}

const getAllProduct = async () => {

    try {

        const data = await ProductModel.find().populate('brand category  sizes')

        return Response.success(messages.get.success, data, HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error)
    }
}

const deleteProductById = async (id) => {
    try {


        const imageByProduct = await ImageModel.find({ product: id });
        if (imageByProduct) {
            const deleteImg = await ImageModel.deleteMany({ product: id })
            if (!deleteImg)
                return Response.error(messages.delete.error, null, HTTP_CODE.client_error.bad_request)

            const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id })

            if (!deletedProduct)
                return Response.error(messages.delete.error, null, HTTP_CODE.client_error.bad_request)


            return Response.success(messages.delete.success, null, HTTP_CODE.success.ok)


        }

        const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id })
        if (!deletedProduct)
            return Response.error(messages.delete.error, null, HTTP_CODE.client_error.bad_request)


        return Response.success(messages.delete.success, null, HTTP_CODE.success.ok)


    } catch (error) {
        return getCatchError(error)
    }
}

const getProductById = async (id) => {
    try {
        const data = await ProductModel.findById({ _id: id }).populate('brand category sizes')

        if (!data)
            return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)

        return Response.success(messages.get.success, data, HTTP_CODE.success.ok)

 
    } catch (error) {
        return getCatchError(error)
    }
}

const updateProductById = async (id, data) => {

    try {

        Object.keys(data).forEach(name => {
            if (data[name] === undefined)
                delete data[name]
        })

        const updateProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true })

        return Response.success(messages.updated.success, updateProduct, HTTP_CODE.success.ok)
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