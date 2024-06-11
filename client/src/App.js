import {Routes,Route,useNavigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import ExpenseForm from './components/expenseForm'
import { useEffect, useState } from 'react';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login'); // Navigate to login page when component mounts
  }, []); 
  return (
    <>
    <Routes>
      <Route path = '/register' element = {<Register/>}></Route>
      <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path = '/expenses/add-expense' element = {<ExpenseForm/>}></Route>
      <Route path = '/expenses/get-expenses' element = {<HomePage/>}></Route>
    </Routes>
    </>
  );
}

export default App;