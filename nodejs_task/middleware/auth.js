// middleware/auth.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    // Check if Authorization header is present
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded; // Store decoded token payload in request object
        next(); // Pass control to the next middleware
    });
};

module.exports = authenticateUser;
