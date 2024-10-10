const express = require('express')
const router = express.Router()

const testimonialController = require('../Controllers/TestimonialController')
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.post('/',verifyToken, testimonialController.createTestimonial)
router.get('/',testimonialController.getAllTestimonials)
router.post('/change-status/:id',verifyToken,verifyAdmin,testimonialController.changeStatusTestimonials)
router.get('/stats/:productId',testimonialController.getTestimonialStatsByProduct)
router.get('/:id',testimonialController.getTestimonialsById)
router.delete('/:id',verifyToken,verifyAdmin,testimonialController.deleteTestimonial)
module.exports = router 