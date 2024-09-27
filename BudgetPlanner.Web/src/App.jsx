import { useState, useEffect } from 'react';
import Dashboard from './Components/Daboard';
import Sidebar from './components/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar'
import BudgetPlanner from './Components/BudgetPlanner';
import IncomeBalance from './Components/IncomeBalance';


function App() {

    /*
    <BudgetPlanner />
    */

    return (
        <div>
            <CustomNavbar />
            <div>
                <IncomeBalance />
            </div>
            <div>
                <Sidebar />
                <Dashboard />
            </div>
        </div>
    );

}

export default App;


