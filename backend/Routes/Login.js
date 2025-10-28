const express = require('express');
const router = express.Router();
// The Signup model contains user details including name, so use it for authentication
const signupModel = require('../Model/Signup');
const usermodel = require('../Model/Login');
const userProfileModel = require('../Model/Userdb');

router.get('/login', async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // Try to authenticate against the signup model so we can access the name and other fields
    const authUser = await signupModel.findOne({ email, password });
    if (authUser) {
      // Ensure a profile document exists for this user. Use the name from signup document.
      let profile = await userProfileModel.findOne({ email });
      if (!profile) {
        const name = authUser.name || 'Unknown';
        profile = new userProfileModel({
          name,
          email,
        });
        await profile.save();
      }
      return res.status(200).json({ user: authUser, profile });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch {
    res.status(500).json({ message: 'Error fetching user' });
  }
});
module.exports = router;