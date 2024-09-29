const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monumentController'); // Adjust path as necessary

// Example route definitions
router.post('/add', monumentController.addMonument);
router.put('/update/:id', monumentController.updateMonument);
router.delete('/delete/:id', monumentController.deleteMonument);
router.get('/all', monumentController.getMonuments);
router.get('/search', monumentController.searchMonuments);
router.get('/filter', monumentController.filter);

module.exports = router;
