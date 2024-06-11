import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './HomePage.css';

const token = localStorage.getItem('token');

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomePage = () => {
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const navigate = useNavigate();
  
 

  const fetchExpenses = async () => {
    try {
      
      const response = await axios.get('/expenses/get-expenses',{
        headers: {
          'x-auth-token': token,
      }});
      setExpenses(response.data);
     
    } catch (error) {
      console.error(error);
    }
  };

  const addExpense = async (expense) => {
    try {
      await axios.post('/expenses/add-expense', expense, {
        headers: {
          'x-auth-token': token,
        },
      });
      fetchExpenses();  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
  

  useEffect(() => {
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalExpenses(total);
  
    const remaining = totalBudget - total;
    setRemainingBudget(remaining);
  }, [expenses, totalBudget]);

  const handleBudgetChange = (e) => {
    setMonthlyBudget(e.target.value);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const budget = parseInt(monthlyBudget);
    if (isNaN(budget)) {
      alert('Please enter a valid number for the budget');
      return;
    }
    setTotalBudget(budget);
    localStorage.setItem('budget',budget);
  };

  const expenseData = {
    labels: expenses.map(expense => expense.category),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map(expense => expense.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
    },
  };

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      
      <h2>Set Monthly Budget</h2>
      <form onSubmit={handleBudgetSubmit}>
        <label>Monthly Budget:</label>
        <input
          type="number"
          value={monthlyBudget}
          onChange={handleBudgetChange}
          placeholder="Enter monthly budget"
          required
        />
        <button type="submit">Set Budget</button>
      </form>
      <Link to="/expenses/add-expense">
        <button type = "submit" onCLick = {addExpense}>Add Expense</button>
      </Link>
     
      <h2>Summary</h2>
      <p>Total Expenses: &#8377; {totalExpenses}</p>
      <p>Total Budget: &#8377; {totalBudget}</p>
      <p>Remaining Budget: &#8377; {remainingBudget}</p>
      {expenses.length === 0 && <p>No expenses recorded yet.</p>}
      <h2>Expense Charts</h2>
      <Bar data={expenseData} options={options} />
    </div>
  );
};

export default HomePage;