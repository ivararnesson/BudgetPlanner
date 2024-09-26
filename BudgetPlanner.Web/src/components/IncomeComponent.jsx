import React, { useState, useEffect } from "react";
import "./IncomeComponent.css";

const IncomeComponent = ({ setIncomes }) => {
    const [amount, setAmount] = useState(""); 
    const [date, setDate] = useState(""); 
    const [saldo, setSaldo] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const income = { amount: parseFloat(amount), date };

        if (amount <= 0) {
            alert("Beloppet måste vara större än 0!");
            return;
        }

        try {
            setLoading(true); 
            const response = await fetch("http://localhost:5174/api/income", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(income), 
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setSaldo(data.totalIncome);
            setIncomes(prevIncomes => [...prevIncomes, { ...income, id: Date.now(), createdAt: new Date() }]); 
            setAmount("");
            setDate("");
        } catch (error) {
            console.error("Error adding income:", error);
            alert("Det gick inte att lägga till inkomsten: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSaldo = async () => {
            const response = await fetch("https://localhost:7246/api/income"); 
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setSaldo(data.totalIncome); 
        };
        fetchSaldo();
    }, []);

    return (
        <div className="income-component">
            <h2>Income Tracker</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} // Update amount state on change
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} // Update date state on change
                    required
                />
                <button type="submit" disabled={loading}>Add Income</button>
            </form>
            {loading && <p>Laddar...</p>} {/* Show loading text if in loading state */}
            <h3>Saldo: {saldo.toFixed(2)} kr</h3> {/* Display saldo */}
        </div>
    );
};

export default IncomeComponent;
