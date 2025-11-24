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
    function clear() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
    function clearEntry() {
        currentInput = '0';
        updateDisplay();
    }
    function handleEquals() {
        if (!operator || waitingForSecondOperand) {
            return;
        }
        
        const secondOperand = parseFloat(currentInput);
        const result = calculate(firstOperand, secondOperand, operator);
        const calculationString = `${firstOperand} ${getOperatorSymbol(operator)} ${secondOperand} = ${result}`;

        if (result === 'Error') {
             currentInput = 'Error';
        } else {
            currentInput = String(result);
            updateHistory(calculationString); 
        } 

        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
    function getOperatorSymbol(op) {
        switch (op) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '×';
            case 'divide': return '÷';
            default: return '';
        }
    }

    function updateMemoryDisplay() {
        memoryValueDisplay.textContent = String(memory).substring(0, 15);
    }
    
    function handleMemory(action) {
        const currentValue = parseFloat(currentInput);
        
        if (action === 'm-clear') {
            memory = 0;
        } else if (action === 'm-recall') {
            currentInput = String(memory);
            waitingForSecondOperand = false;
            updateDisplay();
        } else if (action === 'm-plus') {
            memory += currentValue;
        } else if (action === 'm-minus') {
            memory -= currentValue;
        }
        updateMemoryDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const { value } = event.target.dataset;
            const { action } = event.target.dataset;

            if (value) {
                inputDigit(value);
            } else if (action === 'decimal') {
                inputDecimal('.');
            } else if (action === 'clear') {
                clear();
            } else if (action === 'clear-entry') {
                clearEntry();
            } else if (action === 'calculate') {
                handleEquals();
            } else if (action && (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide')) {
                handleOperator(action);
            } else if (action && (action.startsWith('m-'))) {
                handleMemory(action);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        if (/[0-9]/.test(key)) { 
            inputDigit(key);
        } else if (key === '.') { 
            inputDecimal(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            event.preventDefault(); 
            let action;
            if (key === '+') action = 'add';
            else if (key === '-') action = 'subtract';
            else if (key === '*') action = 'multiply';
            else if (key === '/') action = 'divide';
            handleOperator(action);
        } else if (key === '=' || key === 'Enter') {
            event.preventDefault();
            handleEquals();
        } else if (key === 'c' || key === 'C') {
            clear();
        }
    });

    updateDisplay();
    updateMemoryDisplay();
});

            
