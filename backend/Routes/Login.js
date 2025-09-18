const express = require('express');
const router = express.Router();
const usermodel = require('../Model/Login');

router.get('/login', async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await usermodel.findOne({ email, password });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch {
    res.status(500).json({ message: 'Error fetching user' });
  }
});
module.exports = router;