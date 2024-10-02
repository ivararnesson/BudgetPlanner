import React, { useEffect, useState }from "react"
import "../style/SideNavbar.css"
import { baseUrl } from "../../constants.js"
import SavingsForm from "../SavingsComponents/SavingsForm"
import SavingsPieChart from "../SavingsComponents/SavingsPieChart"

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
        const res = await fetch(`${baseUrl}/api/savings`)
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

    return (
        <div className="sidebar">
            <div className="savings--container">
                <SavingsForm savingsInput={savingsInput} setSavingsInput={setSavingsInput} handleSubmit={handleSubmit} />
                <div className="piechart--container">
                    <h3>{`SPARMÅL ${savingsGoal}`}</h3>
                    {goalReached ? (
                        <div className="goal-message">
                            <h2>{`Grattis du har sparat ${savingsGoal}`}</h2>
                            <button onClick={resetBtn}>Nollställ</button>
                        </div>
                    ) : (
                        <SavingsPieChart data={data} savings={savings} />
                    )}
                </div>
            </div>
        </div>
    )
}

//npm install recharts