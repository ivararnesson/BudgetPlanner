import React, { useState, useEffect } from 'react';
import ExpensesComponent from '../Components/ExpenceFetcher'; // Change to handle expenses
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Sidebar";
import "./style/SideNavbar.css";

function ExpensesPage() {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/expenses'); // Fetching expenses now
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
    <div>
        <div className="expenses-page">
            <div className="budget-planner-sidebar">
                <Sidebar />
            </div>

            <div className="income-container">
                <ExpensesComponent setExpenses={setExpenses} /> { }
            </div>
        </div>
    </div>



    );
}

export default ExpensesPage;