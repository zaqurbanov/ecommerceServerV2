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
    let { name, price, description, brand, category, colors, sizes, stock, inStock, image, type } = data



    try {
        sizes = sizes && sizes.length > 0 ? sizes : [];

        if (!name || !price || !description || !category || !brand || !type)
            return Response.error(messages.post.error, null, HTTP_CODE.client_error.bad_request);




        if (!image) {
            return Response.error('Primary image is required', null, HTTP_CODE.client_error.bad_request);
        }

        const Slug = getCreateSlug(name)

        const isExsistProduct = await ProductModel.findOne({ slug: Slug })


        if (isExsistProduct)
            return Response.error(` "  ${name} "  already exists`, null, HTTP_CODE.client_error.bad_request)




        const result = await cloudinary.uploader.upload(image.image.tempFilePath, {
            folder: 'ecommerce'
        })








        const create = await ProductModel.create({
            ...data,
            primaryImage: result.secure_url,
            public_id: result.public_id,
            sizes,
            slug: Slug
        })


        if (!create)
            return Response.error(messages.post.error, null, HTTP_CODE.client_error.bad_request)



        return Response.success(messages.post.success, create, HTTP_CODE.success.created)



    } catch (error) {

        return getCatchError(error.message)

    }


}

const getAllProduct = async (query, currentPage, limitPage) => {

    try {
        const page = parseInt(currentPage) || 1
        const limit = parseInt(limitPage) || 100000


        const allData = await ProductModel.find()


        const data = await ProductModel.find(query).populate('brand category  sizes type').skip((page - 1) * limit).limit(limit)
        const totalPage = Math.ceil(allData.length / limit)




        return Response.success(messages.get.success, data, HTTP_CODE.success.ok, totalPage, page)
    } catch (error) {
        return getCatchError(error.message)
    }
}

const deleteProductById = async (id) => {
    try {


        // const imageByProduct = await ImageModel.find({ product: id });
        // if (imageByProduct) {
        //     const deleteImg = await ImageModel.deleteMany({ product: id })
        //     if (!deleteImg)
        //         return Response.error(messages.delete.error, null, HTTP_CODE.client_error.bad_request)

        // const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id })

        // if (!deletedProduct)
        //     return Response.error(messages.delete.error, null, HTTP_CODE.client_error.bad_request)

        const product = await ProductModel.findById(id)
        if (!product)
            return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)

        const public_id = product.public_id;
        const allProductImages = await ImageModel.find({ product: id })

        if (Array.isArray(allProductImages)) {

            for (const image of allProductImages) {
                await cloudinary.uploader.destroy(image.public_id)
                await ImageModel.deleteOne({ id: image._id })
            }

        }

        const result = await cloudinary.uploader.destroy(public_id)
        if (result.result !== 'ok')
            return Response.error("Failed to delete image from Cloudinary", null, HTTP_CODE.server_error.internal_server_error)

        await ProductModel.findByIdAndDelete(id)

        return Response.success(messages.delete.success, null, HTTP_CODE.success.ok)






    } catch (error) {

        return getCatchError(error.message)
    }
}

const getProductById = async (id) => {
    try {
        const data = await ProductModel.findById({ _id: id }).populate('brand category sizes type')

        if (!data)
            return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)

        const productImages = await ImageModel.find({ product: id })

        if (productImages) {
            return Response.success(messages.get.success, { ...data._doc, productImages }, HTTP_CODE.success.ok)
        }
        return Response.success(messages.get.success, data, HTTP_CODE.success.ok)


    } catch (error) {
        return getCatchError(error.message)
    }
}

const updateProductById = async (id, data) => {

    try {

        Object.keys(data).forEach(name => {
            if (data[name] === undefined)
                delete data[name]
        })
        const findData = await ProductModel.findById(id);
        if (data.primaryImage) {


            const uploadNewImage = await cloudinary.uploader.upload(data.primaryImage.image.tempFilePath, {
                folder: "ecommerce"
            })
            if (uploadNewImage) {
                const deleteOldImage = await cloudinary.uploader.destroy(findData.public_id)
                if (deleteOldImage) {
                    const updateProduct = await ProductModel.findByIdAndUpdate(id, { ...data, primaryImage: uploadNewImage.secure_url, public_id: uploadNewImage.public_id })

                    if (updateProduct)
                        return Response.success(messages.updated.success, updateProduct, HTTP_CODE.success.ok)
                }

            }

        }
        const updateProduct = await ProductModel.findByIdAndUpdate(id, { ...data, primaryImage: findData.primaryImage, public_id: findData.public_id }, { new: true })

        return Response.success(messages.updated.success, updateProduct, HTTP_CODE.success.ok)
    } catch (error) {

        return getCatchError(error.message)
    }

}


module.exports = {
    createProduct,
    getAllProduct,
    deleteProductById,
    getProductById,
    updateProductById


}