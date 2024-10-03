import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import IncomeComponentNative from './src/Components/IncomeComponentNative';

const App = () => {
    const [incomes, setIncomes] = useState([]);

    return (
        <SafeAreaView style={styles.container}>
            <IncomeComponentNative setIncomes={setIncomes} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEEB',
        justifyContent: 'center', 
        alignItems: 'center',      
        padding: 20,
    },
});

export default App;

