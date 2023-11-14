require('dotenv').config()
const jwt = require('jsonwebtoken')

const signToken = (user) => {
    const token = jwt.sign(user, process.env.SECRET_KEY);
    return token
}

const verifyToken = (token) => {
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    return verified
}

module.exports = {
    signToken,
    verifyToken
}