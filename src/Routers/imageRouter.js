const express = require('express')
const router = express.Router();
const imageController = require('../Controllers/ImageController');
const notFound = require('../middlewares/notFound');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/' , verifyToken, verifyAdmin ,imageController.addImageToProduct)
router.get('/',imageController.getAllImages)
router.delete('/:id', verifyToken, verifyAdmin ,imageController.deleteImg)
router.use("*",notFound)


module.exports = router 