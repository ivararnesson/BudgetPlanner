import React, { useState }from "react";
import "../Components/style/SideNavbar.css"
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

export default function Savings() {
    const [savings, setSavings] = useState(0);
    const [savingsGoal, setSavingsGoal] = useState(0);
    const [goalReached, setGoalReached] = useState(false)
    console.log("render")

    const data = [
        { name: 'Sparat', value: savings },
        { name: 'Återstående', value: savingsGoal - savings }
    ];

    function handleSubmit(event) {
        event.preventDefault()
        const inputValue = parseFloat(event.target.elements[0].value);

        if (event.nativeEvent.submitter.name === "save") {
            if (savingsGoal === 0 ) {
                alert("Vänligen sätt ett sparmål innan du lägger till sparande.");
                return;
            }

            if (inputValue > 0) {
                setSavings(prevSavings => {
                    const newSavings = prevSavings + inputValue;

                    if (newSavings >= savingsGoal) {
                        setGoalReached(true)
                    }
                    return newSavings;
                });
            }
        } 
        else if (event.nativeEvent.submitter.name === "setgoal") {
            if (inputValue > 0) {
                setSavingsGoal(inputValue)
                setGoalReached(false)
            }
        }

        event.target.elements[0].value = ""
    }

    const COLORS = ['#0088FE', '#00C49F']

    return (
        <div className="sidebar">
            <div className="savings--container">
                <form className="savings--form" onSubmit={handleSubmit}>
                    <input 
                        type="number"
                        className="savings--input-number" 
                        placeholder="Spara/Sätt sparmål"
                        required
                    />
                    <input 
                        type="date" 
                        className="savings--input-date" 
                        placeholder="Sätt datum" />
                    <button type="submit" className="savings--btn" name="save">Spara</button>
                    <button type="submit" className="savings--btn" name="setgoal">Sätt sparmål</button>
                </form>
                <div className="piechart--container">
                    <h3>{`SPARMÅL ${savingsGoal}`}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                <Label 
                                    value={`${savings} SEK sparat`} 
                                    position="center" 
                                    style={{ fontSize: '20px', fontWeight: 'bold', fill: '#000' }} 
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {goalReached && (
                    <div className="goal-message">
                        <h2>BRATTE DU KLARA DET</h2>
                        <p>Du har sparat {savings} SEK, vilket uppfyller ditt mål på {savingsGoal} SEK.</p>
                        <button onClick={() => { 
                            setGoalReached(false)
                            setSavings(0)
                            setSavingsGoal(0)
                        }}>Nollställ</button>
                    </div>
                )}
            </div>
        </div>
    )
}

//npm install recharts