document.getElementById('incomeForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 
    const amount = parseFloat(document.getElementById('amount').value);
    const createdAt = document.getElementById('date').value;

    try {
        const response = await fetch('/api/income', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount,
                createdAt: createdAt 
            })
        });

        if (response.ok) {
            const data = await response.json();
           
            document.getElementById('totalIncome').innerText = `Total inkomst: ${data.totalIncome}`;
         
            document.getElementById('incomeForm').reset();
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Fel vid inlämning:', error);
    }
});

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

        const data = await response.json(); 
        document.getElementById('totalIncome').innerText = `Total inkomst: ${data.totalIncome}`;
        console.log('Inkomst uppdaterad framgångsrikt!');
    } catch (error) {
        console.error('Fel vid uppdatering av inkomst:', error);
    }
}

