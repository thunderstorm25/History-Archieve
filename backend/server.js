const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const historicalDetailRoutes = require('./routes/historicalDetailRoutes');
const locationRoutes = require('./routes/locationRoutes');
const monumentRoutes = require('./routes/monumentRoutes');

// Initialize express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001', // Set your allowed client origin
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/historical-details', historicalDetailRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/monuments', monumentRoutes);

// Default port (you can set any default port you want)
const PORT = 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
