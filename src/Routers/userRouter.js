const express = require('express');

const router = express.Router()
const userController = require('../Controllers/UserController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)
router.post('/logout',userController.logoutUser)
router.get('/verify',verifyToken, verifyAdmin,userController.verifyUser)
router.get('/profile',verifyToken,userController.getUserById)
router.get('/',verifyToken,verifyAdmin,userController.getAllUsers)
router.put('/',verifyToken,userController.updateUser)
router.delete('/img-remove',verifyToken,userController.getDeleteUserImage)

module.exports = router 