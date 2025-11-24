document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyList = document.getElementById('historyList');
    const memoryValueDisplay = document.getElementById('memoryValue');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;
    let memory = 0;
    let history = [];
    const MAX_HISTORY = 5;

    function updateDisplay() {
        // Tampilkan error jika terjadi pembagian nol atau hasil tidak valid
        if (currentInput === 'Error') {
            display.value = 'Error: Dibagi Nol';
        } else {
            // Memastikan display tidak melebihi batas (misal 15 digit)
            display.value = currentInput.substring(0, 15);
        }
    }

    