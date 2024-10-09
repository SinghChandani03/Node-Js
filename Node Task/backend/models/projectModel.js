const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('project', {
  
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true // Description is optional
  }
}, {
  tableName: 'project',
  timestamps: false,
});

module.exports = Project;
