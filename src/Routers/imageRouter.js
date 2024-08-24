const express = require('express')
const router = express.Router();
const imageController = require('../Controllers/ImageController');
const notFound = require('../middlewares/notFound');

router.post('/',imageController.addImageToProduct)
router.get('/',imageController.getAllImages)
router.delete('/:id',imageController.deleteImg)
router.use("*",notFound)


module.exports = router 