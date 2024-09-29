// src/Components/IncomeData.js
import React, { useState, useEffect } from "react";
import { incomeData, expenseData } from "../DataChart";

const IncomeData = ({ children, initialMonth }) => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || 0); // Startar på nuvarande månad
  const [income, setIncome] = useState([...incomeData]);
  const [expenses, setExpenses] = useState([...expenseData]);

  const balance = income[selectedMonth] - expenses[selectedMonth];

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

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

  return (
    <div>
      {children({
        income: income[selectedMonth],
        expenses: expenses[selectedMonth],
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