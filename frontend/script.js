const input1 = document.querySelectorAll('.table-container input');
const amountInputs = document.querySelectorAll('#expense-table input');

function saveValue(input) {
    localStorage.setItem(input.id, input.value);
}

input1.forEach(input => {
    input.addEventListener('input', function() {
        saveValue(input);
    });
});

function loadSavedValues() {
    input1.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if(savedValue !== null) {
            input.value= savedValue;
        }
    });
}

loadSavedValues();

function updateTotal() {
    let totalAmount = 0;

    amountInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            totalAmount += value;
        }
    });

    const totalAmountCell = document.getElementById('total-amount');
    totalAmountCell.textContent = totalAmount.toFixed(2);
}

amountInputs.forEach(input => {
    input.addEventListener('input', updateTotal);
});

updateTotal();