const express = require('express')
const router = express.Router()
let userController = require('../controllers/userController')
let memoController = require('../controllers/memoController')
let methods = {}

// NOTE: USER
router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.get('/allUsers', userController.getAllUser)
router.get('/detailUser/:id', userController.getDetailUser)
router.put('/editUser/:id', userController.editUser)
router.delete('/deleteUser/:id', userController.deleteUser)

// NOTE: MEMO
router.post('/createMemo', memoController.createMemo)
router.get('/allMemo', memoController.getAllMemo)
router.get('/allMemoByUser', memoController.getAllMemoByUser)
router.get('/detailMemo/:id', memoController.getDetailMemo)
router.put('/editMemo/:id', memoController.editMemo)
router.delete('/deleteMemo/:id', memoController.deleteMemo)

module.exports = router