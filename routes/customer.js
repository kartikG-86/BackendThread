const express = require('express')
const router = express.Router()

// auth routes
router.post('/login', require('../controller/user/login'))
router.post('/signup', require('../controller/user/signup'))
router.post('/reset-password', require('../controller/user/resetPassword'))
router.get('/check_username/:username',require('../controller/user/checkUserName'))

module.exports = router