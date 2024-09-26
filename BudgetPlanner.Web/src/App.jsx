import { useState, useEffect } from 'react';
import IncomeComponent from './components/IncomeComponent';

function App() {
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
    );
}

export default App;
