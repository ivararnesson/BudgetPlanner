import React, { useEffect, useState }from "react"
import "./style/SideNavbar.css"
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'
import { baseUrl } from "../constants.js"

export default function Savings() {
    const [savings, setSavings] = useState(0)
    const [savingsGoal, setSavingsGoal] = useState(0)
    const [savingsInput, setSavingsInput] = useState("")
    const [goalReached, setGoalReached] = useState(false)

    const data = [
        { name: 'Sparat', value: savings },
        { name: 'Återstående', value: savingsGoal - savings }
    ];

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch(`${baseUrl}/api/person`)
        const data = await res.json()

        if (data.length > 0) {
            const person = data[0]
            setSavingsGoal(person.savingsGoal)
            setSavings(person.savedMoney)
        }
    }

    const resetBtn = async (event) => {
        event.preventDefault()

        await fetch(`${baseUrl}/api/reset/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })

        setGoalReached(false)
        setSavingsGoal(0)
        setSavings(0)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const buttonName = event.nativeEvent.submitter.name

        if(buttonName === "save") {
            const newSavings = savings + parseInt(savingsInput, 10)
            const updatedSavings = {
                savedMoney : newSavings
            }
            if (newSavings >= savingsGoal) {
                setGoalReached(true)
            }

            const res = await fetch(`${baseUrl}/api/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSavings)
            })

            const data = await res.json()
            setSavings(data.savedMoney)
            setSavingsInput("")
        }
        else if (buttonName === "setgoal") {
            const goalData = {
                savingsGoal: parseInt(savingsInput, 10)
            }
            const res = await fetch(`${baseUrl}/api/goal/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(goalData)
            })
            const data = await res.json()
            setSavingsGoal(data.savingsGoal)
            setSavingsInput("")
        }
    }

    const COLORS =  ['#4CAF50', '#FF5733']

    return (
        <div className="sidebar">
            <div className="savings--container">
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
                <div className="piechart--container">
                    <h3>{`SPARMÅL ${savingsGoal}`}</h3>
                    {goalReached ? (
                        <div className="goal-message">
                            <h2>{`Grattis du har sparat ${savingsGoal}`}</h2>
                            <button onClick={resetBtn}>Nollställ</button>
                        </div>) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="40%"
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
                    )}
                </div>
            </div>
        </div>
    )
}

//npm install recharts