const express = require('express');

const categoryController = require('../Controllers/CategoryController');
const notFound = require('../middlewares/notFound');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = express.Router();

router.get("/",categoryController.getAllCategory)
router.get('/lastcategory',categoryController.getThreeCategory)
router.post("/",verifyToken,verifyAdmin,categoryController.createCategory)

router.get('/:id',categoryController.getCategoryBySlug)
router.delete('/:id' , verifyToken, verifyAdmin ,categoryController.deleteCategoryById) 
router.put('/:id', verifyToken, verifyAdmin ,categoryController.updateCategoryById)
router.use("*",notFound)




module.exports = router  