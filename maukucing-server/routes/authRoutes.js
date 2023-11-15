require('dotenv').config()

const passport = require('passport') 
const { login, signUp} = require('../controllers/authController')
const { User } = require('../models/')
const router = require('express').Router()
const {OAuth2Client} = require('google-auth-library');
const { signToken } = require('../helpers/jwt')

// const GoogleStrategy = require('passport-google-oauth20').Strategy


// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback",
//     userProfileURL : "https://www.googleapis.com/oauth2/v3/userInfo"
//   },
//   async function (accessToken, refreshToken, profile, done) {
//     try {
        
//         console.log('da');
//     } catch (error) {
//         console.log(error.message, 'err funccccc');
//     }
//   }

// ));

module.exports = 
router
.post('/login', login)
.post('/register', signUp)


//login/register google

// Triggers the Google OAuth flow
// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// The callback after Google has authenticated the user
router.post('/auth/google/callback', async (req, res) => {
    // The code would be in req.body.code
    // Here you would handle the code exchange for an access token and refresh token
    // Then use the tokens to get user info and create a user session
    // Finally, send back a session token or JWT to the frontend
    try {
        // console.log(req.body);
        const {code} = req.body
        
        const client = new OAuth2Client();
        
        const ticket = await client.verifyIdToken({
            idToken: code,
            audience: process.env.GOOGLE_CLIENT_ID, 
        // Specify the CLIENT_ID of the app that accesses the backend
         // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
        // const payload = ticket.getPayload()
        const {email, sub, password, providerId} = ticket.getPayload();

        // const userid = payload['sub'];
        // console.log(ticket);
        const user = await User.findOrCreate({ where: { email, username : sub, password : sub } });
        const signedToken = signToken({id : user[0].id})
        console.log(signedToken);
        
  // If request specified a G Suite domain:
//   const domain = payload['hd'];

    res.status(200).json(signedToken);
    } catch (error) {
    console.log(error.message);        
    }
  });


