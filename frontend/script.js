const input1 = document.querySelectorAll('.table-container input');
const amountInputs = document.querySelectorAll('#expense-table input');
const budgetmonthly = document.querySelectorAll('#Budgetpermonth');
const budgetdaily = document.querySelectorAll('#Budgetperday');
const salaryAmountCell = document.getElementById('salary');

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

function updateBudgetMonth() {

    let total = 0;

    amountInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            total += value;
        }
    });  

    const salaryAmount = Number(salaryAmountCell.value);  

    const budgetmonthly = salaryAmount - total;

    // Update the displayed budget per month
    const budgetMonthlyElement = document.getElementById('Budgetpermonth');
    budgetMonthlyElement.textContent = budgetmonthly.toFixed(2);

}
amountInputs.forEach(input => {
    input.addEventListener('input', updateBudgetMonth);  // Recalculate budget whenever an expense is changed
});

salaryAmountCell.addEventListener('input', updateBudgetMonth);  // Recalculate budget whenever salary changes

updateBudgetMonth();

function getCurrentDate() {
    const today = new Date();
    
    const day = String(today.getDate()).padStart(2, '0');  // Get the day, padded to 2 digits
    const month = String(today.getMonth() + 1).padStart(2, '0');  // Get the month (0-based, so add 1)
    const year = today.getFullYear();  // Get the year

    return `${month}/${day}/${year}`;  
}

getCurrentDate();  
