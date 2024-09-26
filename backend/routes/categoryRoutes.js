const express = require('express');
const { addCategory, updateCategory, deleteCategory, getCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/add', addCategory);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/all', getCategories);

module.exports = router;
