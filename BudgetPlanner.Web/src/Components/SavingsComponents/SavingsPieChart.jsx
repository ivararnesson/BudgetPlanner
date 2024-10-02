import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'


export default function SavingsPieChart({ data, savings }) {

    const COLORS =  ['#4CAF50', '#FF5733']
    
    return (
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
    )
}