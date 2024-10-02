import React, { useState, useEffect } from "react";
import { baseUrl } from "../../constants";

const IncomeData = ({ children }) => {
  const [income, setIncome] = useState(0); // Total income, not per month
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Total balance
  const balance = income - expenses.reduce((total, expense) => total + expense, NaN);

  // Funktion för att hämta totala inkomster från API
  const fetchIncome = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/income/total`); // Adjust the API endpoint to fetch total income
      if (!response.ok) {
        throw new Error("Failed to fetch income data.");
      }
      const data = await response.json();
      setIncome(data.totalIncome);
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
      setExpenses(data);
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

  if (loading) {
    return <div>Laddar data...</div>;
  }

  return (
    <div>
      {children({
        income,
        expenses: expenses.reduce((total, expense) => total + expense, NaN),
        balance,
      })}
    </div>
  );
};

export default IncomeData;