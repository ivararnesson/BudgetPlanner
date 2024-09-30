import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Daboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../src/Components/CustomNavbar'
import BudgetPlanner from './Components/BudgetPlanner';
import CustomFooter from "./Components/footer";
import ExpensesPage from '../src/Components/ExpenceComponent';

function App() {
<<<<<<< HEAD
    const [incomes, setIncomes] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0); 

    useEffect(() => {
        const fetchTotalIncome = async () => {
            try {
                const response = await fetch('https://localhost:7246/api/income/total');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTotalIncome(data.totalIncome); 
            } catch (error) {
                console.error('Error fetching total income:', error);
            }
        };

        fetchTotalIncome();
    }, []);

    return (
        <div>
            <h1>Budget Planner</h1>
            <IncomeComponent setIncomes={setIncomes} totalIncome={totalIncome} setTotalIncome={setTotalIncome} />
            <Dashboard />
        </div>
=======

    return (
            <Router>
                <CustomNavbar />
                
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/income' element={<BudgetPlanner />} />
                    <Route path="/expences" element={<ExpensesPage />} />
                </Routes>
      <CustomFooter />
            </Router>       
>>>>>>> 7530c60a25ff83c814bad3197fd0e5f8ad4b2703
    );
}

export default App;
