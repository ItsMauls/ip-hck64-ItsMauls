require('dotenv').config()


const { compareToHashPassword, encryptedPw } = require('../helpers/bcrypt.js');
const htmlFormat = require('../helpers/htmlFormat.js');
const { signToken } = require('../helpers/jwt.js');
const { User } = require('../models/index.js')
const { createTransport } = require('nodemailer');



module.exports = class AuthController {
    static async login (req,res,next) {
        try {
            const {email, password} = req.body
            if(!email) {
                throw {name : 'EmailEmpty'}
            }
            if(!password) {
                throw {name : 'PasswordEmpty'}
            }
    
            const user = await User.findOne({
                where : {
                    email : email
                }
            })
            if(!user) {
                throw {name : 'AuthError'}
            }
            const passwordMatch = compareToHashPassword(password, user.password)
            if(!passwordMatch) {
                throw {name : 'AuthError'}
            }
            const access_token = signToken({id : user.id})
            res.status(200).json({access_token : access_token})
        } catch (error) {
            next(error)
        }
    }

    static async signUp(req,res,next) {
        try {
            const transporter = createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                auth: {
                    user: process.env.DEV_EMAIL,
                    pass: process.env.DEV_PASS,
                },
              });
              const {email, password, username} = req.body
              const encPw = encryptedPw(password)
              
            const data = await User.create({email, password : encPw, username})

            await transporter.sendMail({
                from: 'maukucing@yuhuuu.com',
                to: email,
                subject: `Welcome Our Priority Customer`,
                html : htmlFormat(username)
               })

            res.status(201).json(data)
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    
    }
    
    static async googleLogin(req,res,next) {
        try {

              res.status(200).json()
        } catch (error) {
            console.log(error, 'error func');
        }
    }
}