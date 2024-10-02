import React, { useState, useEffect } from "react";
import { baseUrl } from "../../constants";

const IncomeData = ({ children }) => {
  const [income, setIncome] = useState(0); // Total income
  const [expenses, setExpenses] = useState(0); // Total expenses, not an array
  const [loading, setLoading] = useState(true);

  // Total balance calculation
  const balance = income - expenses;

  // Fetch total income from API
  const fetchIncome = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/income/total`); // Adjust API endpoint if needed
      if (!response.ok) {
        throw new Error("Failed to fetch income data.");
      }
      const data = await response.json();
      setIncome(data.totalIncome); // Assuming API returns { totalIncome: number }
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  // Fetch total expenses from API
  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/expenses/total`); // Adjust API endpoint if needed
      if (!response.ok) {
        throw new Error("Failed to fetch expenses data.");
      }
      const data = await response.json();
      setExpenses(data.totalExpenses); // Assuming API returns { totalExpenses: number }
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
        expenses,
        balance,
      })}
    </div>
  );
};

export default IncomeData;