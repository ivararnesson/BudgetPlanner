import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Daboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../src/Components/CustomNavbar'
import BudgetPlanner from './Components/BudgetPlanner';
import CustomFooter from "./Components/footer";
import ExpensesPage from '../src/Components/ExpenceComponent';

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
