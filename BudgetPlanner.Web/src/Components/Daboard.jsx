import React from "react";
import MainCard from "./dashbordComponents/MainCard";
import CategoriesCard from "./dashbordComponents/CategoriesCard";
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
