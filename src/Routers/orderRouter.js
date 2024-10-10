const express = require('express');

const orderController = require('../Controllers/OrderController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = express.Router();


 router.post('/', verifyToken, orderController.createNewOrder)
 router.put('/:id/status',verifyToken,verifyAdmin,orderController.changeOrderStatus)
router.get('/',verifyToken,verifyAdmin,orderController.getAllOrder)
router.get('/:id',verifyToken,verifyAdmin,orderController.getOrderById)

module.exports = router

