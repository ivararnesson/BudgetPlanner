import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { baseUrl } from '../constants';

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
        <View style={styles.background}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#Blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        width: '80%',
        maxWidth: 400,
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        color: '#2c3e50',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    saldo: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
});

export default IncomeComponent;
