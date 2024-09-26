import React from 'react';

const TotalIncome = ({ totalIncome }) => {
    return (
        <div>
            <h2>Total Income</h2>
            <p>{totalIncome.toFixed(2)} kr</p> {}
        </div>
    );
};

export default TotalIncome;
