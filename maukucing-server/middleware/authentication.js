
const {User} = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

require('dotenv').config()
module.exports = async (req,res,next) => {
    try {
        
    if(!req.header('Authorization')) {
        throw {name : 'Unauthorized'}
    }
    const token = req.header('Authorization').split(' ')[1]
            if(!token) {
                throw {name : 'Unauthorized'}
            }
            const verified = verifyToken(token)
            const user = await User.findByPk(verified.id)

            if(!user) {
                throw {name : 'Unauthorized'}
            }
            req.user = user
            next()
    } catch (error) {
        next(error)
    }
}