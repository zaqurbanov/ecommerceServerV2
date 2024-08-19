const express = require('express');
const router = express.Router();
const sizeController = require('../Controllers/SizeController');
const notFound = require('../middlewares/notFound');


router.get('/',sizeController.getAllSize)
router.get('/:slug',sizeController.getSizeBySlug)
router.post('/',sizeController.createSize);
router.put('/:id',sizeController.updateSizeById);
router.delete('/:id',sizeController.deleteSizeById);
router.use("*",notFound)


module.exports = router