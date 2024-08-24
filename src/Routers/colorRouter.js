const express = require('express');
const router = express.Router();
const colorController = require('../Controllers/ColorController');
const notFound = require('../middlewares/notFound');
router.get('/',colorController.getAllColor)
router.post('/',colorController.createColor);
router.delete('/:id',colorController.deleteColorById);
router.put('/:id',colorController.updateColorById)
router.use("*",notFound)



module.exports = router