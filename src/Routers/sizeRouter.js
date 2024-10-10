const express = require('express');
const router = express.Router();
const sizeController = require('../Controllers/SizeController');
const notFound = require('../middlewares/notFound');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');


router.get('/',sizeController.getAllSize)
router.get('/:id',sizeController.getSizeBySlug)
router.post('/',verifyToken, verifyAdmin , sizeController.createSize);
router.put('/:id', verifyToken, verifyAdmin ,sizeController.updateSizeById);
router.delete('/:id', verifyToken, verifyAdmin ,sizeController.deleteSizeById);
router.use("*",notFound)


module.exports = router