const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Location = sequelize.define('Location', {
  name: { type: DataTypes.STRING, allowNull: false },
  latitude: { type: DataTypes.DECIMAL(9, 6), allowNull: true },
  longitude: { type: DataTypes.DECIMAL(9, 6), allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true }
}, {
  timestamps: false // Disable `createdAt` and `updatedAt`
});

module.exports = Location;
