const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/authRoute', require('./routes/authRoute')); 
app.use('/api/projectRoute', require('./routes/projectRoute')); 

// Sync models with the database
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
