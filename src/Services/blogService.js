const HTTP_CODE = require("../config/HTTP_CODE");
const messages = require("../config/Messages");
const Response = require("../config/Response");
const getCatchError = require("../helpers/catchErrorGenerator");
const getCreateSlug = require("../helpers/slugCreator");
const BlogModels = require("../Models/BlogModels");

const cloudinary = require('cloudinary').v2


const createBlog = async (userId, images, data) => {
    try {
        if (!data.title || !data.content)
            return Response.error(messages.post.error, null, HTTP_CODE.client_error.bad_request);

        if (!images)
            return Response.error('Primary and secondary image are required', null, HTTP_CODE.client_error.bad_request);


        const Slug = getCreateSlug(data.title)

        const isExsistBlog = await BlogModels.findOne({ slug: Slug })


        if (isExsistBlog)
            return Response.error(` "  ${data.title} "  already exists`, null, HTTP_CODE.client_error.bad_request)


        const uploadPrimaryImage = await cloudinary.uploader.upload(images.primaryImage.tempFilePath, {
            folder: "blog"
        })

        const uploadSecondaryImage = await cloudinary.uploader.upload(images.secondaryImage.tempFilePath, {
            folder: "blog"
        })

        const create = await BlogModels.create({
            title: data.title,

            content: data.content,
            author: userId,
            slug: Slug,
            primaryImage: uploadPrimaryImage.secure_url,
            primaryId: uploadPrimaryImage.public_id,
            secondaryImage: uploadSecondaryImage.secure_url,
            secondaryId: uploadSecondaryImage.public_id

        })

        if (!create)
            return Response.error(messages.post.error, null, HTTP_CODE.client_error.bad_request)


        return Response.success(messages.post.success, create, HTTP_CODE.success.created)
    } catch (error) {
        return getCatchError(error.message)
    }



}
const deleteBlogById = async (id) => {
    try {

        const blog = await BlogModels.findById(id)
        
        if (!blog)
            return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)

        const primaryId = blog.primaryId
        const secondaryId = blog.secondaryId


        const deletePrimary = await cloudinary.uploader.destroy(primaryId)
        const deleteSecondary = await cloudinary.uploader.destroy(secondaryId)

        if (deletePrimary.result !== "ok" || deleteSecondary.result !== "ok")
            return Response.error("Failed to delete image from Cloudinary", null, HTTP_CODE.server_error.internal_server_error)

        const result = await BlogModels.findByIdAndDelete(id)

        if (!result)
            return Response.error("Failed delete Blog ", null, HTTP_CODE.client_error.bad_request)

        return Response.success(messages.delete.success, null, HTTP_CODE.success.ok)

    } catch (error) {
        return getCatchError(error.message)
    }





}

const getAllBlog = async (searchQuery) => {
    try {
let query = {}
        if (searchQuery) {
            query = {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } } 
                    // { content: { $regex: searchQuery, $options: 'i' } }
                ]
            };
        }
        const result = await BlogModels.find(query).populate('author')
        if (!result)
            return Response.error(messages.get.error, null, HTTP_CODE.client_error.not_found)

        return Response.success(messages.get.success, result, HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)
    }
}

const getBlogById = async(id)=>{
    try {
        const result  = await BlogModels.findById(id).populate('author')
        
        if(!result)
            return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)

        return Response.success(messages.get.success,result,HTTP_CODE.success.ok)
    } catch (error) {
        
        return getCatchError(error.message)
    }
}
const updateBlogById = async(id,data,images)=>{
    try {
        Object.keys(data).forEach(name => {
            if (data[name] === undefined)
                delete data[name]
        })
        const blog = await BlogModels.findById(id)
        if(!blog)
            return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)
        let newPrimaryImage=blog.primaryImage 
        let newPrimaryId = blog.primaryId
        let newSecondaryImage=blog.secondaryImage
        let newSecondaryId =blog.secondaryId
        if(images.primaryImage){
            newPrimaryImage = await cloudinary.uploader.upload(images.primaryImage.tempFilePath,{
                folder:'blog'
            })

            
                await cloudinary.uploader.destroy(blog.primaryId)
                newPrimaryId = newPrimaryImage.public_id
          
         
                newPrimaryImage=blog.primaryImage 
            
        }
        if(images.secondaryImage){
             newSecondaryImage= await cloudinary.uploader.upload(images.secondaryImage.tempFilePath)

           
                await cloudinary.uploader.destroy(blog.secondaryId)
                newSecondaryId = newSecondaryImage.public_id
           
                newSecondaryImage=blog.secondaryImage
            
        }

        const updateBlog = await BlogModels.findByIdAndUpdate(id,{...data,primaryId:newPrimaryId,primaryImage:newPrimaryImage,secondaryId:newSecondaryId,secondaryImage:newSecondaryImage},{new:true})
        return Response.success(messages.updated.success, updateBlog, HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)
    }

}



module.exports = {
    createBlog,
    deleteBlogById,
    getAllBlog,
    getBlogById,
    updateBlogById
}