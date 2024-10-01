import React, { useState, useEffect } from "react";
import { baseUrl } from "../../constants";

const IncomeData = ({ children, initialMonth }) => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || 0);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Om data saknas, sätt 0 som fallback
  const balance = (income[selectedMonth] || NaN) - (expenses[selectedMonth] || NaN);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Funktion för att hämta inkomster från API
  const fetchIncome = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/income`);
      if (!response.ok) {
        throw new Error("Failed to fetch income data.");
      }
      const data = await response.json();
      setIncome(data); // Förutsätter att API returnerar en array av inkomster per månad
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  // Funktion för att hämta utgifter från API
  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/expenses`);
      if (!response.ok) {
        throw new Error("Failed to fetch expenses data.");
      }
      const data = await response.json();
      setExpenses(data); // Förutsätter att API returnerar en array av utgifter per månad
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchIncome();
      await fetchExpenses();
      setLoading(false);
    };
    fetchData();
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
        income: income[selectedMonth] || NaN, // Om data saknas, visa 0
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

