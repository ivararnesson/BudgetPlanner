import React from "react";
import MainCard from "./dashbordComponents/MainCard";
import CategoriesCard from "./dashbordComponents/CategoriesCard";
import "../Components/style/dashboard.css";
import IncomeBalance from "./IncomeBalance";
import Sidebar from "./Sidebar";

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
