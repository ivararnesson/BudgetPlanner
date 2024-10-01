import React, { useState, useEffect } from 'react';
import ExpensesComponent from '../Components/ExpenceFetcher';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Sidebar";
import "./style/SideNavbar.css";

function ExpensesPage() {

    const [expenses, setExpenses] = useState([]);


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