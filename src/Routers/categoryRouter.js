const express = require('express');

const categoryController = require('../Controllers/CategoryController');
const notFound = require('../middlewares/notFound');
const router = express.Router();

router.get("/",categoryController.getAllCategory)

router.post("/",categoryController.createCategory)

router.get('/:slug',categoryController.getCategoryBySlug)
router.delete('/:id',categoryController.deleteCategoryById) 
router.put('/:id',categoryController.updateCategoryById)
router.use("*",notFound)




module.exports = router 