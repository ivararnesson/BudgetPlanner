import { useState, useEffect } from 'react';
import IncomeComponent from './components/IncomeComponent';
import Dashboard from './components/Daboard';
import Sidebar from './components/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar'

function App() {
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/income');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setIncomes(data);
            } catch (error) {
                console.error('Error fetching incomes:', error);
            }
        };

        fetchIncomes();
    }, []);

    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);

    return (
        <div>
            <h1>Budget Planner</h1>

            <IncomeComponent setIncomes={setIncomes} />
              
             <CustomNavbar />
             <Sidebar />

            <Dashboard />
        
        </div>
    );

}

export default App;


