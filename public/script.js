const input1 = document.querySelectorAll('.table-container input');
const amountInputs = document.querySelectorAll('#expense-table input');
const budgetmonthly = document.querySelectorAll('#Budgetpermonth');
const budgetdaily = document.querySelectorAll('#Budgetperday');
const salaryAmountCell = document.getElementById('salary');
const budgetDailyElement = document.getElementById('Budgetperday');
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownContent = document.querySelector('.dropdown-content');
const submitButton = document.getElementById('submit-button');
const dateDisplay = document.getElementById('date-display');
const dailyInputAmount = document.getElementById('daily-input-amount');
const monthlyTableBody = document.getElementById('monthly-table-body');
const expenseCheckboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
const monthlyTable = document.getElementById('monthly-chart');

// save inputted values whenever inputted
function saveValue(input) {
    localStorage.setItem(input.id, input.value);
}
input1.forEach(input => {
    input.addEventListener('input', function () {
        saveValue(input);
    });
});



function loadSavedValues() {
    input1.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
            input.value = savedValue;
        };
    });
}

loadSavedValues();

// total calculation
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

// Update Budget / Month calculated metric
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

    updateBudgetDay();
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

document.getElementById('date-display').textContent = getCurrentDate();

//budget / day = budget / month /  (last day of month - first day of month + 1)

function getDaysInMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
}

function updateBudgetDay() {
    const budgetMonthlyElement = document.getElementById('Budgetpermonth');
    const budgetDailyElement = document.getElementById('Budgetperday');

    let num = parseFloat(budgetMonthlyElement.innerHTML) / getDaysInMonth();
    budgetDailyElement.textContent = num.toFixed(2);
}

dropdownButton.addEventListener('click', () => {
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none"
    }
    else {
        dropdownContent.style.display = "block";
    }
});

// when submit button is pressed...
submitButton.addEventListener('click', () => {
    console.log("clicked");
    // only submit if a value has been entered
    //if (dailyInputAmount === 0 || !Array.from(expenseCheckboxes).some(checkbox => checkbox.checked)) 
    if (!dailyInputAmount.value || parseFloat(dailyInputAmount.value) === 0 || !Array.from(expenseCheckboxes).some(checkbox => checkbox.checked)) {
        //stop function
        return;
    }

    // get categories and amount
    const currentDate = getCurrentDate();

    const selectedExpenses = Array.from(expenseCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const amount = parseFloat(dailyInputAmount.value) || 0;

    // create Date in monthly chart
    const newRow = document.createElement('tr');
    const dateCell = document.createElement('td');
    dateCell.textContent = currentDate;
    newRow.appendChild(dateCell);

    // create Expense in monthly chart
    const expensesCell = document.createElement('td');
    const expensesDropdown = document.createElement('div');
    expensesDropdown.className = 'expenses-dropdown';

    if (selectedExpenses.length > 0) {
        const span = document.createElement('span');
        span.textContent = 'Expenses';
        expensesDropdown.appendChild(span);

        const expensesContent = document.createElement('div');
        expensesContent.className = 'expenses-dropdown-content';
        selectedExpenses.forEach(expense => {
            const expenseItem = document.createElement('p');
            expenseItem.textContent = expense;
            expensesContent.appendChild(expenseItem);
        });
        expensesDropdown.appendChild(expensesContent);
    }
    else {
        expensesDropdown.textContent = 'No expenses';
    }

    expensesCell.appendChild(expensesDropdown);
    newRow.appendChild(expensesCell);

    // Create Amount monthly chart
    const amountCell = document.createElement('td');
    amountCell.className = 'amount-cell';
    amountCell.textContent = amount.toFixed(2);
    newRow.appendChild(amountCell);

    // Balance col
    const balanceCell = document.createElement('td');
    balanceCell.className = 'balance-cell';
    const budgetPerDay = parseFloat(budgetDailyElement.textContent) || 0;

    // const previousRow = monthlyTableBody.lastElementChild;
    // let previousBalance = previousRow
    //     ? parseFloat(previousRow.querySelector('.balance-cell').textContent) || 0
    //     : budgetPerDay;
    const previousRow = monthlyTableBody.lastElementChild;
    let previousBalance;

    if (previousRow && previousRow.querySelector('.balance-cell')) {
        previousBalance = parseFloat(previousRow.querySelector('.balance-cell').textContent) || 0;
    } else {
        previousBalance = budgetPerDay;
    }

    const currentBalance = previousRow ? previousBalance - amount : budgetPerDay - amount;

    balanceCell.textContent = currentBalance.toFixed(2);
    newRow.appendChild(balanceCell);

    //monthlyTableBody.appendChild(newRow);


    // new column with delete button to delete row
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', () => {
        const rowToDelete = deleteButton.closest('tr');
        if (rowToDelete) {
            monthlyTableBody.removeChild(rowToDelete);
        }
    });
    deleteCell.appendChild(deleteButton);
    newRow.appendChild(deleteCell);
    monthlyTableBody.appendChild(newRow);

    saveMonthlyChart();

})

// save monthly table
function saveMonthlyChart() {
    const rowsData = [];
    const rows = monthlyTableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => cell.textContent.trim());
        rowsData.push(rowData);
    });

    localStorage.setItem('rowsData', JSON.stringify(rowsData));
}

// load monthly data
function loadMonthlyChart() {
    const savedData = localStorage.getItem('rowsData');

    if (savedData) {
        const rowsData = JSON.parse(savedData);
        monthlyTableBody.innerHTML = '';
        
        rowsData.forEach(rowData => {
            const row = document.createElement('tr');
            
            // Date cell
            const dateCell = document.createElement('td');
            dateCell.textContent = rowData[0];
            row.appendChild(dateCell);
            
            // Expenses cell
            const expensesCell = document.createElement('td');
            expensesCell.textContent = rowData[1];
            row.appendChild(expensesCell);
            
            // Amount cell
            const amountCell = document.createElement('td');
            amountCell.className = 'amount-cell';
            amountCell.textContent = rowData[2];
            row.appendChild(amountCell);
            
            // Balance cell
            const balanceCell = document.createElement('td');
            balanceCell.className = 'balance-cell';
            balanceCell.textContent = rowData[3];
            row.appendChild(balanceCell);
            
            // Delete button cell
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            
            // deleteButton.addEventListener('click', () => {
            //     const rowToDelete = deleteButton.closest('tr');
            //     if (rowToDelete) {
            //         monthlyTableBody.removeChild(rowToDelete);
            //         saveMonthlyChart();
            //     }
            // });
            
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);
            
            monthlyTableBody.appendChild(row);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadMonthlyChart();
})

monthlyTableBody.addEventListener("input", () => {
    saveMonthlyChart();

})

// monthlyTableBody.addEventListener("click", event => {
//     if (event.target.matches(".delete-button")) {
//         saveMonthlyChart();
//     }
// });
monthlyTableBody.addEventListener("click", event => {
    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
        const rowToDelete = event.target.closest('tr');
        if (rowToDelete) {
            console.log("Deleting row:", rowToDelete);
            rowToDelete.remove();
            saveMonthlyChart();
        }
    }
});

function removeMonthlyChart() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    
    const lastClearedMonth = localStorage.getItem('lastClearedMonth');
    const lastClearedMonthNumber = parseInt(lastClearedMonth);
    
    // Check if it's a new month AND we haven't cleared it yet
    if (currentDay === 1 && lastClearedMonthNumber !== currentMonth) {
        localStorage.removeItem('rowsData');
        localStorage.setItem('lastClearedMonth', currentMonth.toString());

        if (monthlyTableBody) {
            monthlyTableBody.innerHTML = '';
        }
    }
}

removeMonthlyChart();

document.addEventListener('DOMContentLoaded', () => {
    removeMonthlyChart();
});


// add row with 'No expenses' if no daily input


// edit categories and value in monthly chart