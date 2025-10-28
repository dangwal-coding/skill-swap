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

        // Normalize email to avoid case-sensitive duplicates
        const normalizedEmail = String(email).trim().toLowerCase();

        // Pre-check for existing user to avoid duplicate key errors
        const existingUser = await usermodel.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new usermodel({
            name,
            email: normalizedEmail,
            dob,
            mobile,
            password,
            gender,
            photo
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Map MongoDB duplicate key error (E11000) to a friendly 409 response
        if (error && error.code === 11000 && (error.keyPattern?.email || error.keyValue?.email)) {
            return res.status(409).json({ message: 'User already exists' });
        }
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;