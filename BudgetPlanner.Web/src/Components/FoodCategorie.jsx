import React from "react";
import foodData from "../data"; // Import your data file

function FoodCategorie() {
  return (
    <div className="categories-container">
      {foodData.map((food, index) => (
        <div key={index} className="categories-card-container">
          <p className="categories-card-categorie">{food.category}</p> {/* kategori */}
          <p className="categories-card-amount">{food.price}kr</p> {/* pris */}
        </div>
      ))}
    </div>
  );
}

export default FoodCategorie;