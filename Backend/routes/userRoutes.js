const express = require('express')
const { registerUser, authUser, allUsers } = require('../Controllers/userController')
const { protect } = require('../Middleware/userHandler')

const router = express.Router()

router.route('/').post(registerUser)
router.route('/').get(protect, allUsers)
router.post('/login', authUser)

module.exports = router