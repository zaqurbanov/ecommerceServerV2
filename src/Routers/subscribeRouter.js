const express = require('express')
const subscribeController = require('../Controllers/SubscribeController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = express.Router();


router.post('/',subscribeController.createSubscribe)
router.get('/',subscribeController.getAllSubscribe)
router.post('/send',verifyToken,verifyAdmin, subscribeController.sendEmails)




module.exports = router