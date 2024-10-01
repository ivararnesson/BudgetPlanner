import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IncomeCard from "../IncomeComponents/IncomeCard";
import IncomeData from "./DataBalance";
import "../style/BalanceCards.css";

function IncomeBalance() {

    const months = [
        "Januari", "Februari", "Mars", "April", "Maj", "Juni",
        "Juli", "Augusti", "September", "Oktober", "November", "December"
    ];

    // Hämta den aktuella månaden
    const currentMonth = new Date().getMonth();

    return (
        <div>
            <IncomeData initialMonth={currentMonth}>
                {({
                    income,
                    expenses,
                    balance,
                    selectedMonth,
                    handleMonthChange,
                    updateIncome,
                    updateExpenses
                }) => (
                    <div className="container-balance">
                        <h1>Budgeten för {months[selectedMonth]}</h1>
                        <label>Välj månad:</label>
                        <select value={selectedMonth} onChange={handleMonthChange}>
                            {months.map((month, index) => (
                                <option key={index} value={index}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <IncomeCard income={income} expenses={expenses} balance={balance} />
                    </div>
                )}
            </IncomeData>
        </div>
    );
}

export default IncomeBalance;