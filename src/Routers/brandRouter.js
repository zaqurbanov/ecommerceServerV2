

const express = require('express');
const brandController = require('../Controllers/BrandController');
const notFound = require('../middlewares/notFound');
const router = express.Router()


router.get('/', brandController.getAllBrand);
router.get('/:id',brandController.getBrandBySlug);
router.post('/',brandController.createBrand);
router.delete('/:id',brandController.deleteBrandById);
router.put('/:id',brandController.updateBrandById)
router.use("*",notFound)


module.exports = router