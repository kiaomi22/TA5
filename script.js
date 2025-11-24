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
        if (currentInput === 'Error') {
            display.value = 'Error: Dibagi Nol';
        } else {
            display.value = currentInput.substring(0, 15);
        }
    }

    function updateHistory(calculation) {
        history.unshift(calculation); 
        if (history.length > MAX_HISTORY) {
            history.pop(); 
        }

        historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
        if (history.length === 0) {
            historyList.innerHTML = '<li>Belum ada perhitungan.</li>';
       }
   }
   function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateDisplay();
}
