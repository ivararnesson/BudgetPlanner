import React, { useState, useEffect } from "react";
import "./style/IncomeComponent.css";

const ExpensesComponent = ({ setExpenses }) => {
    const [amount, setAmount] = useState(""); 
    const [date, setDate] = useState(""); 
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expense = { amount: parseFloat(amount), date };

        if (amount <= 0) {
            alert("Beloppet måste vara större än 0!");
            return;
        }

        try {
            setLoading(true); 
            const response = await fetch("http://localhost:5000/api/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expense), 
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setTotalExpenses(data.totalExpenses); 
            setExpenses(prevExpenses => [...prevExpenses, { ...expense, id: Date.now(), createdAt: new Date() }]); 
            setAmount("");
            setDate("");
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("Det gick inte att lägga till utgiften: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchTotalExpenses = async () => {
            const response = await fetch("http://localhost:5000/api/expenses");
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setTotalExpenses(data.totalExpenses); 
        };
        fetchTotalExpenses();
    }, []);

    return (
        <div className="income-component">
            <h2>Utgifter</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Saldo"
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
                <button type="submit" disabled={loading}>Lägg till utgift</button>
            </form>
            {loading && <p>Laddar...</p>} {/* Show loading text if in loading state */}
            <h3>Saldo: {totalExpenses.toFixed(3)} kr</h3> {/* Display total expenses */}
        </div>
    );
};

export default ExpensesComponent;