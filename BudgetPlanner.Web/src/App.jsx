import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/Components/DashbordComponents/Daboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../src/Components/PageComponents/CustomNavbar'
import BudgetPlanner from './Components/IncomeComponents/BudgetPlanner';
import CustomFooter from "../src/Components/PageComponents/Footer";
import ExpensesPage from './Components/ExpencesComponents/ExpenceComponent';

function App() {

    return (
        <Router>
            <CustomNavbar />               
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/income' element={<BudgetPlanner />} />
                <Route path="/expences" element={<ExpensesPage />} />
            </Routes>
            <CustomFooter />
        </Router>       
    );
}

export default App;
