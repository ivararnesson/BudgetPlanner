import React, { useState, useEffect } from "react";
import "./style/IncomeComponent.css";
import { baseUrl } from "../constants";

const IncomeComponent = ({ setIncomes }) => {
    const [amount, setAmount] = useState(""); 
    const [date, setDate] = useState(""); 
    const [saldo, setSaldo] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const income = { 
            amount: parseFloat(amount), 
            createdAt: date
        };

        if (amount <= 0) {
            alert("Beloppet måste vara större än 0!");
            return;
        }

        try {
            setLoading(true); 
            const response = await fetch(`${baseUrl}/api/income`, {
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

    const fetchSaldo = async () => {
        const response = await fetch(`${baseUrl}/api/income/total`); 
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = await response.json();
        setSaldo(data.totalIncome); 
    };
    const fetchTotalExpenses = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/expenses/total`)
            if (!response.ok) {
                const errorMessage = await response.text()
                throw new Error(errorMessage)
            }
            const data = await response.json()
            setTotalExpenses(data.totalExpens)
        } catch (error) {
            console.error("Error fetching total expenses:", error)
            alert("Kunde inte hämta totala utgifter: " + error.message)
        }
    };

    useEffect(() => {
        fetchSaldo();
        fetchTotalExpenses();
    }, []);

    return (
        <div className="income-component">
            <h2>Inkomster</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Saldo"
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
                <button type="submit" disabled={loading}>Lägg till inkomst</button>
            </form>
            {loading && <p>Laddar...</p>}
            <h3>Saldo: {saldo.toFixed(3) - totalExpenses.toFixed(3)} kr</h3>
        </div>
    );
};

export default IncomeComponent;
