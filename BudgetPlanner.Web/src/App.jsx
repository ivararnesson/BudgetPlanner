import { useState, useEffect } from 'react';
import Dashboard from './Components/Daboard';
import Sidebar from './components/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar'
import BudgetPlanner from './Components/BudgetPlanner';

function App() {

    return (
        <div>
            
            <BudgetPlanner />
              
             <CustomNavbar />
             <Sidebar />

            <Dashboard />
        
        </div>
    );

}

export default App;


