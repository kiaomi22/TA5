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
    function inputDecimal(dot) {
        if (waitingForSecondOperand === true) {
            currentInput = '0.';
            waitingForSecondOperand = false;
            updateDisplay();
            return;
        }
        if (!currentInput.includes(dot)) {
            currentInput += dot;
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            if (result === 'Error') {
                currentInput = 'Error';
                firstOperand = null;
                operator = null;
            } else {
                currentInput = String(result);
                firstOperand = result;
            }
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
        updateDisplay();
    }
    function calculate(first, second, op) {
        if (op === 'add') {
            return first + second;
        } else if (op === 'subtract') {
            return first - second;
        } else if (op === 'multiply') {
            return first * second;
        } else if (op === 'divide') {
            if (second === 0) {
                return 'Error'; 
            }
            return first / second;
        }
        return second;
    }
            
