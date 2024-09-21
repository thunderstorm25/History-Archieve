const express = require('express');
const sequelize = require('./config/db');
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const locationRoutes = require('./routes/locationRoutes');
const monumentRoutes = require('./routes/monumentRoutes');
const historicalDetailRoutes = require('./routes/historicalDetailRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/api/category', categoryRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/monument', monumentRoutes);
app.use('/api/historical', historicalDetailRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
