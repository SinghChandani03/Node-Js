const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SignUp = require('../models/signupModel');

// Define regex for input validation
const emailInput = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const passwordInput = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

router.post('/login', [
    check('email').trim().matches(emailInput).withMessage('Enter a valid email'),
    check('password').matches(passwordInput).withMessage('Password must be at least 8 characters long like - Abc@1214455')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    try {
        console.log('Attempting login for email:', email);

        // Check if the user exists
        let user = await SignUp.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        console.log('User found:', user);

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        console.log('Password matched for user:', email);

        // Generate JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

        // Send response with token
        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
