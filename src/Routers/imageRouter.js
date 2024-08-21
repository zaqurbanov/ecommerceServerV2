const express = require('express')
const router = express.Router();
const imageController = require('../Controllers/ImageController')

router.post('/',imageController.addImageToProduct)


router.use("*",notFound)


module.exports = router