import React, { useState, useEffect } from "react";
import { baseUrl } from "../../constants";

const IncomeData = ({ children }) => {
  const [income, setIncome] = useState(NaN); // Total income
  const [expenses, setExpenses] = useState(NaN); // Total expenses
  const [loading, setLoading] = useState(true);

  // Total balance calculation
  const balance = income - expenses;

  // Fetch total income from API
  const fetchIncome = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/income/total`);
      if (!response.ok) {
        throw new Error("Failed to fetch income data.");
      }
      const data = await response.json();
      console.log("Fetched Income Data:", data); // Log fetched income data
      setIncome(data.totalIncome);
    } catch (error) {
      console.error("Error fetching income:", error);
      // Set income to NaN if there's an error
      setIncome(NaN);
    }
  };

  // Fetch total expenses from API
  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/expenses/total`);
      if (!response.ok) {
        throw new Error("Failed to fetch expenses data.");
      }
      const data = await response.json();
      console.log("Fetched Expenses Data:", data); // Log fetched expenses data
      setExpenses(data.totalExpenses); // Assuming API returns { totalExpenses: number }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // Set expenses to NaN if there's an error
      setExpenses(NaN);
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
  }, []); // Empty dependency array ensures this runs only once

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