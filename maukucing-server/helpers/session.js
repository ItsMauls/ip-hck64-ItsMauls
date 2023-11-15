const axios = require('axios');

const { signToken } = require('./jwt');
const express = require('express')
const app = express()

// Exchange the authorization code for an access token
async function exchangeCodeForToken(code) {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code: code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: 'http://localhost:3000/auth/google/callback',
    grant_type: 'authorization_code',
  });
  return response.data; // { access_token, refresh_token, ... }
}

// Fetch the user's profile with the access token
async function fetchUserProfile(access_token) {
  const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return response.data; // User's profile information
}

// Generate a token for the user
function generateTokenForUser(user) {
  // This will create a JWT. The 'secret' should be an environment variable
  const token = signToken({id : user.id});
  return token;
}

// This is an example of how you might use these functions in an Express route handler
app.post('/auth/google/callback', async (req, res) => {
  try {
    const { token } = req.body;
    const { access_token } = await exchangeCodeForToken(code);
    const userProfile = await fetchUserProfile(access_token);
    
    // Assume you have a function to find or create the user in your database
    const user = await findOrCreateUser(userProfile);
    
    const generateToken = generateTokenForUser(user);
    res.json({ token });
  } catch (error) {
    console.error('Error in Google Auth Callback:', error,message);
    res.status(500).send('Authentication error');
  }
});

module.exports = {exchangeCodeForToken, fetchUserProfile, generateTokenForUser}