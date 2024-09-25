import { useState, useEffect } from 'react';
import IncomeForm from './IncomeComponent'; // Kolla att sökvägen stämmer

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

    // Beräkna total inkomst
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);

    return (
        <div>
            <h1>Budget Planner</h1>
            <IncomeForm setIncomes={setIncomes} />
            <h2>Your Incomes</h2>
            <ul>
                {incomes.map(income => (
                    <li key={income.id}>
                        Amount: ${income.amount} (Added on: {new Date(income.createdAt).toLocaleDateString()})
                    </li>
                ))}
            </ul>
            <h3>Total Income: ${totalIncome.toFixed(2)}</h3>
        </div>
    );
}

export default App;
