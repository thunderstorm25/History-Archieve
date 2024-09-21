const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Monument = require('./Monument');

const HistoricalDetail = sequelize.define('HistoricalDetail', {
  monument_id: { type: DataTypes.INTEGER, references: { model: Monument, key: 'id' } },
  event: { type: DataTypes.STRING, allowNull: false },
  event_date: { type: DataTypes.DATE },
  details: { type: DataTypes.TEXT }
});

HistoricalDetail.belongsTo(Monument, { foreignKey: 'monument_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = HistoricalDetail;
