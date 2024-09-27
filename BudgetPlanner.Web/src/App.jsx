import { useState, useEffect } from 'react';
import Dashboard from './Components/Daboard';
import Sidebar from './components/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar'
import BudgetPlanner from './Components/BudgetPlanner';

function App() {

    /*
    <BudgetPlanner />
    */

    return (
        <div>
            
            <CustomNavbar />
            <Sidebar />

            <Dashboard />
        
        </div>
    );

}

export default App;


