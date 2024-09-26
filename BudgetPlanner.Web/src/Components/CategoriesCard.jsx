import React from "react";
import "../Components/style/dashboard.css";
import FoodCategorie from "./FoodCategorie";

export default function CategoriesCard() {
  return (
    <>
      <div className="categories-card">
        <h1>Utgifter per kategori</h1>
        <div className="categories-card-content">
          <FoodCategorie />
        </div>
     </div>
    </>
  );
}
