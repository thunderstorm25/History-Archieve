const express = require('express');
const { addCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, addCategory);
router.put('/update/:id', verifyToken, verifyAdmin, updateCategory);
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteCategory);
router.get('/all', verifyToken, getCategories);

module.exports = router;
