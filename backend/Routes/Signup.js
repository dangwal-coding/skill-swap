const express = require('express');
const router = express.Router();
const usermodel = require('../Model/Signup');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}
router.post('/signup', upload.single('photo'), async (req, res) => {
    try {
        const { name, email, dob, mobile, password, gender } = req.body;
        const photo = req.file ? req.file.path : null;

        if (!name || !email || !dob || !mobile || !password || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = new usermodel({
            name,
            email,
            dob,
            mobile,
            password,
            gender,
            photo
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;