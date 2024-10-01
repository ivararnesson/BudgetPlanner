import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { baseUrl } from '../constants';
import styles from '../Styles/IncomeStyles';

const IncomeComponent = ({ setIncomes }) => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [saldo, setSaldo] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const income = {
            amount: parseFloat(amount),
            createdAt: date
        };

        if (amount <= 0) {
            alert('Beloppet måste vara större än 0!');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/api/income`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(income),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setSaldo(data.totalIncome);
            setIncomes(prevIncomes => [...prevIncomes, { ...income, id: Date.now(), createdAt: new Date() }]);
            setAmount('');
            setDate('');
        } catch (error) {
            alert('Det gick inte att lägga till inkomsten: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSaldo = async () => {
            const response = await fetch(`${baseUrl}/api/income/total`);
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setSaldo(data.totalIncome);
        };
        fetchSaldo();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inkomster</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Belopp"
                    value={amount}
                    onChangeText={setAmount}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Datum (ÅÅÅÅ-MM-DD)"
                    value={date}
                    onChangeText={setDate}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Laddar...' : 'Lägg till inkomst'}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.saldo}>Saldo: {saldo.toFixed(2)} kr</Text>
        </View>
    );
};

export default IncomeComponent;
