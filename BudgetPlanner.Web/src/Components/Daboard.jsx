import React from "react";
import MainCard from "./MainCard";
import CategoriesCard from "./CategoriesCard";
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
