import React, { useState } from 'react';
import axios from 'axios';
import './style/IncomeComponent.css';

const IncomeComponent = ({ setIncomes, totalIncome, setTotalIncome }) => {
    const [amount, setAmount] = useState(""); 
    const [date, setDate] = useState(""); 
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const income = { 
            amount: parseFloat(amount), 
            createdAt: new Date(date).toISOString() 
        };
    
        if (amount <= 0) {
            alert("Beloppet måste vara större än 0!");
            return;
        }
    
        try {
            setLoading(true);
            const response = await axios.post("https://localhost:7246/api/income", income, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setTotalIncome(response.data.totalIncome); 

            setIncomes(prevIncomes => [...prevIncomes, income]);
            setAmount("");
            setDate("");
        } catch (error) {
            console.error("Error adding income:", error);
            alert("Det gick inte att lägga till inkomsten: " + (error?.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="income-component">
            <h2>Income Tracker</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>Add Income</button>
            </form>
            {loading && <p>Laddar...</p>}
            <h3>Saldo: {totalIncome.toFixed(2)} kr</h3> {}
        </div>
    );
};

export default IncomeComponent;
