const express = require('express');
const categoryRouter = require('./categoryRouter')
const productTypeRouter = require('./productTypeRouter')
const brandRouter = require('./brandRouter')
const sizeRouter = require('./sizeRouter')
const productRouter = require('./productRouter')
const colorRouter = require('./colorRouter')
const imageRouter = require('./imageRouter')

const router = express.Router()
router.use('/category',categoryRouter)
router.use('/type',productTypeRouter)
router.use('/brand',brandRouter)
router.use('/size',sizeRouter)
router.use('/product',productRouter) 
router.use('/color',colorRouter)
router.use('/image',imageRouter)
module.exports = router