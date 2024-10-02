import React, { useState, useEffect } from "react";
import { baseUrl } from "../../constants";
import { incomeData, expenseData } from "../../DataChart"; // Adjust the import path

const IncomeData = ({ children, initialMonth }) => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || 0);
  const [income, setIncome] = useState(incomeData);
  const [expenses, setExpenses] = useState(expenseData);
  const [loading, setLoading] = useState(false);

  // Om data saknas, sätt 0 som fallback
  const balance = (income[selectedMonth] || 0) - (expenses[selectedMonth] || 0);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Removed fetch functions since we're using static data
  useEffect(() => {
    setLoading(false); // No loading state needed as data is static
  }, []);

  const updateIncome = (value) => {
    const newIncome = [...income];
    newIncome[selectedMonth] = value;
    setIncome(newIncome);
  };

  const updateExpenses = (value) => {
    const newExpenses = [...expenses];
    newExpenses[selectedMonth] = value;
    setExpenses(newExpenses);
  };

  if (loading) {
    return <div>Laddar data...</div>;
  }

  return (
    <div>
      {children({
        income: income[selectedMonth] || 0, // Om data saknas, visa 0
        expenses: expenses[selectedMonth] || 0, 
        balance,
        selectedMonth,
        handleMonthChange,
        updateIncome,
        updateExpenses,
      })}
    </div>
  );
};

export default IncomeData;