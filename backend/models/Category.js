const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // Disable `createdAt` and `updatedAt`
});

module.exports = Category;
