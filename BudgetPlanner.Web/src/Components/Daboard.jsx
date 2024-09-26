import React from "react";
import MainCard from "./DashbordComponents/MainCard";
import CategoriesCard from "./DashbordComponents/CategoriesCard";
import "../Components/style/dashboard.css";

function Dashboard() {
  return (
    <>
      <div>
        <MainCard />
      </div>
      
      <div>
        <CategoriesCard />
      </div>
    </>
  );
}
export default Dashboard;
