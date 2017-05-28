const express = require('express')
const router = express.Router()
let userController = require('../controllers/userController')
let methods = {}

router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.get('/allUsers', userController.getAllUser)
router.get('/detailUser/:id', userController.getDetailUser)
router.put('/editUser/:id', userController.editUser)
router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router