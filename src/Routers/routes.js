const express = require('express');
const categoryRouter = require('./categoryRouter')
const productTypeRouter = require('./productTypeRouter')
const brandRouter = require('./brandRouter')
const sizeRouter = require('./sizeRouter')
const productRouter = require('./productRouter')
const colorRouter = require('./colorRouter')
const imageRouter = require('./imageRouter');
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')
const subscribeRouter = require('./subscribeRouter')

const testimonialRouter = require('./testimonialRouter')
const faqRouter = require('../Routers/faqRouter')
const blogRouter = require('../Routers/blogRouter');
const notFound = require('../middlewares/notFound');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router()
router.use('/category', categoryRouter)
router.use('/type',productTypeRouter)
router.use('/brand',brandRouter)
router.use('/size',sizeRouter)
router.use('/product',productRouter) 
router.use('/color',colorRouter)
router.use('/image',imageRouter)
router.use('/user',userRouter)
router.use('/order',orderRouter)
router.use('/subscribe',subscribeRouter)
router.use('/testimonial',testimonialRouter)
router.use('/faq',faqRouter)

router.use('/blog',blogRouter)
router.use('*',notFound)
module.exports = router
