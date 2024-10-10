const express = require('express')
const router = express.Router()
const faqController = require('../Controllers/FaqController')
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')


router.get('/',faqController.getAllFaqs)
router.get('/:id',faqController.getFaqById)
router.post('/',verifyToken,verifyAdmin,faqController.createFaq)
router.put('/:id',verifyToken,verifyAdmin,faqController.updateFaq)
router.delete('/:id',verifyToken,verifyAdmin,faqController.deleteFaqById)





module.exports = router