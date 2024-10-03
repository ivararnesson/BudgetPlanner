async function updateIncome(id, amount, createdAt) {
    try {
        const response = await fetch(`/api/income/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, createdAt })
        });

        if (!response.ok) {
            throw new Error('Error updating income: ' + response.statusText);
        }

        console.log('Inkomst uppdaterad framgångsrikt!');
    } catch (error) {
        console.error('Fel vid uppdatering av inkomst:', error);
    }
}
