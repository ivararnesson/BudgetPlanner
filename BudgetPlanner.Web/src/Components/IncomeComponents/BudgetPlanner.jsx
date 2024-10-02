import { useState, useEffect } from 'react';
import IncomeComponent from './IncomeComponents';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "../SavingsComponents/Sidebar";
import "../style/SideNavbar.css"



function BudgetPlanner() {
    
    const [incomes, setIncomes] = useState([]);

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


