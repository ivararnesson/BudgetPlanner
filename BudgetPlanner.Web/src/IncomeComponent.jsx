import { useState } from 'react';

function IncomeForm({ setIncomes }) {
    const [amount, setAmount] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newIncome = { amount: parseFloat(amount), createdAt };

        try {
            const response = await fetch('http://localhost:5000/api/income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newIncome),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setIncomes((prevIncomes) => [...prevIncomes, data.income]); // Lägg till den nya inkomsten
            setAmount('');
            setCreatedAt('');
        } catch (error) {
            console.error('Error adding income:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Belopp"
                required
            />
            <input
                type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                required
            />
            <button type="submit">Lägg till inkomst</button>
        </form>
    );
}

export default IncomeComponent;
