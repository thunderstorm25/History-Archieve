const express = require('express');
const { addMonument, updateMonument, deleteMonument, getMonuments } = require('../controllers/monumentController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, addMonument);  // Admin: Add monument
router.put('/update/:id', verifyToken, verifyAdmin, updateMonument);  // Admin: Update monument
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteMonument);  // Admin: Delete monument
router.get('/all', verifyToken, getMonuments);  // User/Admin: View all monuments

module.exports = router;
