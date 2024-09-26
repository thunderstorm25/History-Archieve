const express = require('express');
const { addHistoricalDetail, updateHistoricalDetail, deleteHistoricalDetail, getHistoricalDetails } = require('../controllers/historicalDetailController');

const router = express.Router();

router.post('/add', addHistoricalDetail);  // Admin: Add historical detail
router.put('/update/:id', updateHistoricalDetail);  // Admin: Update historical detail
router.delete('/delete/:id', deleteHistoricalDetail);  // Admin: Delete historical detail
router.get('/all', getHistoricalDetails);  // User/Admin: View all historical details

module.exports = router;
