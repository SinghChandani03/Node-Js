const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const SignUp = require('../models/signupModel');
const bcrypt = require('bcryptjs');

// Define regex for input validation
const emailInput = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const passwordInput = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameInput = /^\s*(.{5,10})\s*$/;

router.post('/signup', [
    check('name').trim().matches(nameInput).withMessage('Name must be between 5 to 10 characters'),
    check('email').trim().matches(emailInput).withMessage('Enter a valid email'),
    check('password').matches(passwordInput).withMessage('Password must be at least 8 characters long like - Abc@1214455')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        // Check if the email already exists
        let existingUser = await SignUp.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Insert user into MySQL database using Sequelize ORM
        const newUser = await SignUp.create({
            name,
            email,
            password: hashedPassword 
        });

        // Generate response
        res.status(201).json({ success: true, message: 'User registered successfully' });

    } catch (error) {
        console.error('Error inserting user into database:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

module.exports = router;
