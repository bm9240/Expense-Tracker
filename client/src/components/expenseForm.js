import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpenseForm = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in!');
      return;
    }
    const userId = localStorage.getItem('userId');

    const expense = {
      title,
      amount: parseFloat(amount),
      category,
      description,
      date,
      userId
    };

    try {
      const response = await axios.post('/expenses/add-expense', expense, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Response:', response);
      alert('Expense Added');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to add expense');
    }
  };

  return (
    <center>
      <div className="expenseForm">
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p>
              <label>Title: </label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </p>
          </div>
          <div>
            <p>
              <label>Amount: </label>
              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </p>
          </div>
          <div>
            <p>
              <label>Date: </label>
              <input
                type="date"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </p>
          </div>
          <div>
            <p>
              <label>Category: </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing">Housing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </p>
          </div>
          <div>
            <p>
              <label>Description: </label>
              <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </p>
          </div>
          <p>
            <button type="submit">Add Expense</button>
          </p>
        </form>
      </div>
    </center>
  );
};

export default ExpenseForm;
