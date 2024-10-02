import React, { useState, useEffect } from "react";
import { incomeData, expenseData } from "../../DataChart";

const IncomeData = ({ children, initialMonth }) => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || 0);
  const [income, setIncome] = useState(incomeData);
  const [expenses, setExpenses] = useState(expenseData);
  const [loading, setLoading] = useState(false);

  const balance = (income[selectedMonth] || NaN) - (expenses[selectedMonth] || NaN);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  useEffect(() => {
    setLoading(false);
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
        income: income[selectedMonth] || NaN, 
        expenses: expenses[selectedMonth] || NaN, 
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