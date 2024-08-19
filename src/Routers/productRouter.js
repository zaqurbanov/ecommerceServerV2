
const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');
const notFound = require('../middlewares/notFound');
router.get('/',productController.getAllProduct)
router.get('/:id',productController.getProductById)
router.post('/',productController.createProduct)
router.post('/:id',productController.getProductById)
router.put('/:id',productController.updateProductById)
router.delete('/:id',productController.deleteProductById)
router.use("*",notFound)

module.exports = router