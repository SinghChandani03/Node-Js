const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/authModel');

// Define regex for input validation
const emailInput = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const passwordInput = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameInput = /^\s*(.{5,10})\s*$/;

exports.signupValidation = [
    check('name').trim().matches(nameInput).withMessage('Name must be between 5 to 10 characters'),
    check('email').trim().matches(emailInput).withMessage('Enter a valid email'),
    check('password').matches(passwordInput).withMessage('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character')
];

// POST /signup - Register a new user
exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        let existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ success: true, message: 'User registered successfully' });

    } catch (error) {
        console.error('Error inserting user into database:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
};

exports.loginValidation = [
    check('email').trim().matches(emailInput).withMessage('Enter a valid email'),
    check('password').matches(passwordInput).withMessage('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character')
];

// POST /login - Login user
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// GET /users - Get all users (requires authentication)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
};