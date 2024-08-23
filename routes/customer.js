const express = require('express')
const router = express.Router()


router.post('/login', require('../controller/user/login'))
router.post('/signup', require('../controller/user/signup'))
router.post('/reset-password', require('../controller/user/resetPassword'))

module.exports = router