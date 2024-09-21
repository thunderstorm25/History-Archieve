const express = require('express');
const { addLocation, updateLocation, deleteLocation, getLocations } = require('../controllers/locationController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, addLocation);  // Admin: Add location
router.put('/update/:id', verifyToken, verifyAdmin, updateLocation);  // Admin: Update location
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteLocation);  // Admin: Delete location
router.get('/all', verifyToken, getLocations);  // User/Admin: View all locations

module.exports = router;
