const express = require('express');
const { 
  addMonument, 
  updateMonument, 
  deleteMonument, 
  getMonuments, 
  searchMonuments, 
  filter
} = require('../controllers/monumentController');

const router = express.Router();

router.post('/add', addMonument);  // Admin: Add monument
router.put('/update/:id', updateMonument);  // Admin: Update monument
router.delete('/delete/:id', deleteMonument);  // Admin: Delete monument
router.get('/all', getMonuments);  // User/Admin: View all monuments
router.get('/search', searchMonuments);  // User/Admin: Search monuments by name

// New Route: Filter monuments by construction year
router.get('/filter', filter);  // User/Admin: Filter by construction year range

module.exports = router;
