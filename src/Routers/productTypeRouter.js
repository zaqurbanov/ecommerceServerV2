const express = require('express');
const productTypeController = require('../Controllers/ProductTypeController');
const notFound = require('../middlewares/notFound');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/',productTypeController.getAllProductType)
router.post('/', verifyToken, verifyAdmin ,productTypeController.createProductType)
router.get('/:id',productTypeController.getProductTypeBySlug)
router.delete('/:id', verifyToken, verifyAdmin , productTypeController.deleteProductTypeById)
router.put('/:id',verifyToken, verifyAdmin , productTypeController.updateProductTypeById)
router.use("*",notFound)

module.exports = router 