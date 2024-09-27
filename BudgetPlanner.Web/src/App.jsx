import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Daboard';
import Sidebar from './components/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar'
import BudgetPlanner from './Components/BudgetPlanner';

function App() {

    return (
            <Router>
                <CustomNavbar />
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/income' element={<BudgetPlanner />} />
                </Routes>
            </Router>       
    );

}

export default App;


