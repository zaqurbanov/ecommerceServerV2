const express = require('express');
const categoryRouter = require('./categoryRouter')
const productTypeRouter = require('./productTypeRouter')
const brandRouter = require('./brandRouter')
const sizeRouter = require('./sizeRouter')
const productRouter = require('./productRouter')

const router = express.Router()
router.use('/category',categoryRouter)
router.use('/type',productTypeRouter)
router.use('/brand',brandRouter)
router.use('/size',sizeRouter)
router.use('/product',productRouter) 


module.exports = router