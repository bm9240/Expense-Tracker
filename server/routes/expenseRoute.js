const express = require('express');
const { addExpense, getExpenses } = require('../controllers/expenseController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/add-expense', authMiddleware, addExpense);
router.get('/get-expenses', authMiddleware, getExpenses);

module.exports = router;
