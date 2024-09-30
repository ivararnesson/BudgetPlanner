import React from "react";


export default function SavingsForm({ savingsInput, setSavingsInput, handleSubmit }) {
    return (
        <form className="savings--form" onSubmit={handleSubmit}>
            <input 
                type="number"
                className="savings--input-number" 
                placeholder="Spara/Sätt sparmål"
                value={savingsInput}
                onChange={(e) => setSavingsInput(e.target.value)}
                required
            />
            <input 
                type="date" 
                className="savings--input-date" 
                placeholder="Sätt datum" />
            <button type="submit" className="savings--btn" name="save">Spara</button>
            <button type="submit" className="savings--btn" name="setgoal">Sätt sparmål</button>
        </form>
    )
}