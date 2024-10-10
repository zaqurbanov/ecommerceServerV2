const express = require('express')

const router = express.Router()
const blogController = require('../Controllers/BlogController')
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.post('/',verifyToken,verifyAdmin,blogController.createBlog)
router.delete('/:id',verifyToken,verifyAdmin,blogController.deleteBlogById)
router.get('/',blogController.getAllBlog)
router.get('/:id',blogController.getBlogById)
module.exports = router