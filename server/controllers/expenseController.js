const expenseModel = require('../models/expenseModel');
const user = require('../middlewares/auth')


const addExpense = async (req, res) => {
    try {
        const newExpense = new expenseModel({
            title: req.body.title,
            amount: req.body.amount,
            date: req.body.date,
            category: req.body.category,
            description: req.body.description,
            userId: req.user._id // Ensure this is coming from the middleware
        });
        
        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const getExpenses = async (req, res) => {
    try {
      const expenses = await expenseModel.find({ userId: req.user._id });
      res.json(expenses);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
module.exports = { addExpense, getExpenses };
