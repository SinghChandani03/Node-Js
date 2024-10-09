const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SignUp = sequelize.define('signup', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'signup',
    timestamps: false,
});

module.exports = SignUp;
