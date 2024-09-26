const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Monument = require('./Monument');

const HistoricalDetail = sequelize.define('HistoricalDetail', {
  monument_id: { 
    type: DataTypes.INTEGER, 
    references: { model: Monument, key: 'id' } 
  },
  event_name: { // Update field name to match the database column
    type: DataTypes.STRING, 
    allowNull: false 
  },
  event_date: { 
    type: DataTypes.DATE 
  },
  details: { 
    type: DataTypes.TEXT 
  }
}, {
  timestamps: false // Disable `createdAt` and `updatedAt`
});

HistoricalDetail.belongsTo(Monument, { foreignKey: 'monument_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = HistoricalDetail;
