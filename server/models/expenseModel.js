const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'title is required']

    },
    amount: {
        type: Number,
        required: [true,'amount is required']
    },
    type: {
        type: String,
        default:"Expense"
    },
    date: {
        type: Date,
        required: [true,'date is required']
        
    },
    category: {
        type: String,
        required: [true,'category is required']
      
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: require('./UserModel'),
        required: true,
        index: true
      },
}, {timestamps: true})

const expenseModel = mongoose.model('expense',expenseSchema);
module.exports = expenseModel;