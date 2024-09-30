import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import IncomeComponentNative from './src/Components/IncomeComponentNative'; 

const App = () => {
    const [incomes, setIncomes] = useState([]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <IncomeComponentNative setIncomes={setIncomes} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
});

export default App;
