import { useState, useEffect } from 'react';
import IncomeComponent from './IncomeComponents';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Sidebar";
import "./style/SideNavbar.css"



function BudgetPlanner() {
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
            <div>
                <div className="butget-planer-sidebar">
                    <Sidebar />
                </div>

                <div className="income-container">
                    <IncomeComponent setIncomes={setIncomes} />
                </div>
            </div>
        </div>
    );

}

export default BudgetPlanner;


