import React from "react";
import MainCard from "./MainCard";
import CategoriesCard from "./CategoriesCard";
import "../style/Dashboard.css";
import IncomeBalance from "../BalanceComponents/IncomeBalance";
import Sidebar from "../SavingsComponents/Sidebar";

function Dashboard() {
  return (
    <>
      <div>
        <IncomeBalance />
        <div>
          <Sidebar />
          <MainCard />
        </div>
      </div>
      
      <div>
        <CategoriesCard />
      </div>
    </>
  );
}
export default Dashboard;
