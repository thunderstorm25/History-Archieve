const { Sequelize } = require('sequelize');

// Database configuration (hardcoded here)
const sequelize = new Sequelize('MonumentArchive', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging for cleaner output
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Error: ' + err);
  });

  sequelize.sync()
  .then(() => console.log('Models synced...'))
  .catch(err => console.log('Error syncing models: ' + err));

module.exports = sequelize;
