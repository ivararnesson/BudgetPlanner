import React from "react";
import "../Components/style/BalanceCards.css";
import { FaDollarSign } from "react-icons/fa";

function IncomeCard() {
  return (
    <div className="balance-container">
        <div className="balance-card">
            <div className="balance-title-container">
                <FaDollarSign className="balance-icon" />
                    <div className="balance-text-container">
                        <h1 className="balance-title">Tillgängligt Saldo:</h1>
                        <h1 className="balance-value">0.00</h1>
                    </div>
            </div>
        </div>

        <div className="balance-card">
            <div className="balance-title-container">
                <FaDollarSign className="income-icon" />
                    <div className="balance-text-container">
                        <h1 className="balance-title">Total Inkomst:</h1>
                        <h1 className="balance-value">0.00</h1>
                    </div>
            </div>
        </div>

        <div className="balance-card">
            <div className="balance-title-container">
                <FaDollarSign className="expence-icon" />
                    <div className="balance-text-container">
                        <h1 className="balance-title">Totala Utgifter:</h1>
                        <h1 className="balance-value">0.00</h1>
                    </div>
            </div>
        </div>
        
    </div>
  );
}
export default IncomeCard;