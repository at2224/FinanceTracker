const input1 = document.querySelectorAll('.table-container input');

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