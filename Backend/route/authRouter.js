const authRoute = require('express').Router()
const authController = require('../controller/authController')

authRoute.post('/login', authController.login)
authRoute.post('/register', authController.register)
authRoute.get('/logout',authController.logout)
authRoute.get('/show',authController.user)

module.exports = authRoute