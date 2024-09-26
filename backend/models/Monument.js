const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');
const Location = require('./Location');

const Monument = sequelize.define('Monument', {
  mon_name: { type: DataTypes.STRING, allowNull: false }, // Changed from 'name' to 'mon_name'
  mon_description: { type: DataTypes.TEXT }, // Changed from 'description' to 'mon_description'
  category_id: { 
    type: DataTypes.INTEGER, 
    references: { model: Category, key: 'id' },
    allowNull: false // Assuming category_id is NOT NULL in the DB
  },
  location_id: { 
    type: DataTypes.INTEGER, 
    references: { model: Location, key: 'id' },
    allowNull: false // Assuming location_id is NOT NULL in the DB
  },
  construction_year: { type: DataTypes.INTEGER, allowNull: true }, // Kept the same
  architect: { type: DataTypes.STRING, allowNull: true }, // Kept the same
  image_url: { type: DataTypes.STRING, allowNull: true } // Kept the same
}, {
  timestamps: false // Disable `createdAt` and `updatedAt`
});

// Associations
Monument.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Monument.belongsTo(Location, { foreignKey: 'location_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

module.exports = Monument;
