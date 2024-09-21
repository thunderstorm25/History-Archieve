const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');
const Location = require('./Location');

const Monument = sequelize.define('Monument', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category_id: { type: DataTypes.INTEGER, references: { model: Category, key: 'id' } },
  location_id: { type: DataTypes.INTEGER, references: { model: Location, key: 'id' } },
  construction_year: { type: DataTypes.INTEGER, allowNull: true },
  architect: { type: DataTypes.STRING, allowNull: true },
  image_url: { type: DataTypes.STRING, allowNull: true }
});

Monument.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Monument.belongsTo(Location, { foreignKey: 'location_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

module.exports = Monument;
