const express = require('express')
const router = express.Router()
let Helpers = require('../helpers/helpers')
let userController = require('../controllers/userController')
let memoController = require('../controllers/memoController')
let methods = {}

// NOTE: USER
router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.get('/allUsers', Helpers.checkRole, userController.getAllUser)
router.get('/detailUser/:id', Helpers.checkRole, userController.getDetailUser)
router.put('/editUser/:id', userController.editUser)
router.delete('/deleteUser/:id', Helpers.checkRole, userController.deleteUser)

// NOTE: MEMO
router.post('/createMemo', Helpers.checkRole, memoController.createMemo)
router.get('/allMemo', Helpers.checkRole, memoController.getAllMemo)
router.get('/allMemoByUser', Helpers.checkRole, memoController.getAllMemoByUser)
router.get('/detailMemo/:id', memoController.getDetailMemo)
router.put('/editMemo/:id', memoController.editMemo)
router.delete('/deleteMemo/:id', Helpers.checkRole, memoController.deleteMemo)

module.exports = router