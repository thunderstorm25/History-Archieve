const express = require('express');
const { addHistoricalDetail, updateHistoricalDetail, deleteHistoricalDetail, getHistoricalDetails } = require('../controllers/historicalDetailController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, addHistoricalDetail);  // Admin: Add historical detail
router.put('/update/:id', verifyToken, verifyAdmin, updateHistoricalDetail);  // Admin: Update historical detail
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteHistoricalDetail);  // Admin: Delete historical detail
router.get('/all', verifyToken, getHistoricalDetails);  // User/Admin: View all historical details

module.exports = router;
