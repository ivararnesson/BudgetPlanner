import React from "react";
import groceryStoreImg from "./Assets/grocery-store.png";
import deliveryImg from "./Assets/delivery.png";
import theaterImg from "./Assets/theater.png";
import tShirtImg from "./Assets/t-shirt.png";
import addImg from "./Assets/add.png";
import homeImg from "./Assets/home.png";
import loanImg from "./Assets/loan.png";

const foodData = [
    { 
        category: "Mat", 
        price: 2600,
        coverImg: groceryStoreImg,
    },
    { 
        category: "Transport", 
        price: 5000, 
        coverImg: deliveryImg,
    },
    { 
        category: "Nöje", 
        price: 800,
        coverImg: theaterImg, 
    },
    {
        category: "Kläder",
        price: 400,
        coverImg: tShirtImg,
    },
   
    {
        category: "Hem",
        price: 4000,
        coverImg: homeImg,
    },

    {
        category: "Lån",
        price: 4000,
        coverImg: loanImg,
    },

    {
        category: "Övrigt",
        price: 100,
        coverImg: addImg,
    },
];

export default foodData;