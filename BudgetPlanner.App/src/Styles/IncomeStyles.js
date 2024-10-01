import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        width: '100%', 
    },
    form: {
        backgroundColor: '#ffffff', 
        borderRadius: 12,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        width: width > 600 ? '80%' : '90%', 
        maxWidth: 500, 
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        color: '#2c3e50',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        fontSize: 18,
        width: '100%',
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
        width: '100%', 
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
        textAlign: 'center',
    },
});

export default styles;
