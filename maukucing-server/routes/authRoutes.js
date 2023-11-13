const { login, signUp } = require('../controllers/authController')

const router = require('express').Router()

module.exports = 
router
.post('/login', login)
.post('/register', signUp)