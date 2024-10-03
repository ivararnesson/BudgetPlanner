import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "../style/Dashboard.css";
import { incomeData, expenseData } from '../../DataChart'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MainCard() {
  const labels = [
    "Jan", "Feb", "Mar", "Apr", "Maj",
    "Jun", "Jul", "Aug", "Sep", "Okt",
    "Nov", "Dec",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Inkomst",
        data: incomeData,
        backgroundColor: 'rgba(37, 225, 16)',
        borderColor: 'rgb(0, 164, 0)',
        borderWidth: 0.5
      },
      {
        label: 'Utgifter',
        data: expenseData,
        backgroundColor: 'rgba(232, 21, 21)',
        borderColor: 'rgb(209, 26, 26)',
        borderWidth: 0.5
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Månad'
        },
        barPercentage: 0.5,
        categoryPercentage: 0.8
      },
      y: {
        title: {
          display: true,
          text: "Tusen Kr",
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  return (
    <div className="main-card">
      <div className="main-card-content" style={{ height: '400px', width: '100%' }}>
        <h1 className="main-text">Inkomster/Utgifter</h1>
        <Bar data={data} options={options} className="chart" />
      </div>
    </div>
  );
}

export default MainCard;