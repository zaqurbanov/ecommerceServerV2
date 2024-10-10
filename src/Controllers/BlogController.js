const generateResult = require("../helpers/resultGenerator")

const blogService = require('../Services/blogService.js')



 const createBlog =async (req,res)=>{
    const data = req.body
const userId = req.user.id
const images = req.files
    
    const result  = await blogService.createBlog(userId,images,data)
    generateResult(res,result)

}


const deleteBlogById = async(req,res)=>{
    const {id} =req.params
    const result = await blogService.deleteBlogById(id)
    generateResult(res,result) 
}
const getAllBlog = async (req,res)=>{
    const searchQuery = req.query.search

    const result  = await blogService.getAllBlog(searchQuery)
    generateResult(res,result)
}

const getBlogById = async(req,res)=>{
    const {id} = req.params
    
    const result = await blogService.getBlogById(id)
    generateResult(res,result)
}

const updateBlogById = async(req,res)=>{
    const {id} = req.params
    const data = req.body
    const images = req.files

    const result  = await blogService.updateBlogById(id,data,images)
    generateResult(res,result)

}
 module.exports = {
    createBlog,
    deleteBlogById,
    getAllBlog,
    getBlogById,
    updateBlogById
 }