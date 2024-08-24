const express = require('express');
const productTypeController = require('../Controllers/ProductTypeController');
const notFound = require('../middlewares/notFound');

const router = express.Router();

router.get('/',productTypeController.getAllProductType)
router.post('/',productTypeController.createProductType)
router.get('/:slug',productTypeController.getProductTypeBySlug)
router.delete('/:id',productTypeController.deleteProductTypeById)
router.put('/:id',productTypeController.updateProductTypeById)
router.use("*",notFound)

module.exports = router 