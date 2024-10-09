const express = require('express');
const router = express.Router();
const  authController = require('../controller/authController');
const authenticateUser = require('../middleware/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/users', authenticateUser, authController.getUsers);

module.exports = router;
