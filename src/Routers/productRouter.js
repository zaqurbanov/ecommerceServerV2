
const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');
const notFound = require('../middlewares/notFound');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
router.get('/',productController.getAllProduct)
router.get('/:id',productController.getProductById)
router.post('/', verifyToken, verifyAdmin ,productController.createProduct)
router.post('/:id',verifyToken, verifyAdmin ,productController.getProductById)
router.put('/:id',verifyToken, verifyAdmin ,productController.updateProductById)
router.delete('/:id',verifyToken, verifyAdmin ,productController.deleteProductById)

router.use("*",notFound)

module.exports = router