const { fetchUserProfile, generateTokenForUser, exchangeCodeForToken } = require('./session')

const {User} = require('../models/')


 module.exports = async function createSessionForUser(code) {
    // Exchange code for access token
    const { access_token } = await exchangeCodeForToken(code);
    console.log(access_token);
    // Use access token to get user information
    const userProfile = await fetchUserProfile(access_token);
  
    // Find or create user in your database
    const user = await User.findOrCreate({ where: { email: userProfile.email } });
  
    // Generate session token or JWT
    const sessionToken = generateTokenForUser(user);
  
    return sessionToken;
  }

  