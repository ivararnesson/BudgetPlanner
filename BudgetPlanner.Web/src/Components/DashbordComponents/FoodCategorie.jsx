import React from "react";
import foodData from "../../DataCategorie";

function FoodCategorie() {
  return (
    <div className="categories-container">
      {foodData.map((food, index) => (
        <div key={index} className="categories-card-container">
          <img src={food.coverImg} alt={food.category} className="categories-card-icon" /> 
          <p className="categories-card-categorie">{food.category}</p>{" "}
          <p className="categories-card-amount">{food.price} kr</p> 
        </div>
      ))}
    </div>
  );
}

export default FoodCategorie;