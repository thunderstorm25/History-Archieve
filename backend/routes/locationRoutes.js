const express = require('express');
const { addLocation, updateLocation, deleteLocation, getLocations } = require('../controllers/locationController');

const router = express.Router();

router.post('/add', addLocation);  // Admin: Add location
router.put('/update/:id', updateLocation);  // Admin: Update location
router.delete('/delete/:id', deleteLocation);  // Admin: Delete location
router.get('/all', getLocations);  // User/Admin: View all locations

module.exports = router;
