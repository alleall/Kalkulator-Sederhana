let expressionEl = document.getElementById('expression');
let tempResultEl = document.getElementById('temp-result');
let resultEl = document.getElementById('result');

let currentInput = '';
let result = '';

function updateDisplay() {
  const visualExp = currentInput
    .replace(/\*/g, 'x')
    .replace(/\//g, '÷');

  expressionEl.textContent = visualExp || '0';

  // Tampilkan hasil sementara jika belum klik "="
  if (currentInput !== '' && !result) {
    try {
      const evalTemp = eval(currentInput.replace(/[^0-9+\-*/%.]/g, ''));
      tempResultEl.textContent = evalTemp;
    } catch {
      tempResultEl.textContent = '';
    }
  } else {
    tempResultEl.textContent = '';
  }

  // Hasil final
  resultEl.textContent = result !== '' ? result : '';
}

function appendNumber(num) {
  currentInput += num;
  result = '';
  updateDisplay();
}

function appendOperator(op) {
  const lastChar = currentInput.slice(-1);
  if ("+-*/%".includes(lastChar)) return;

  if (op === 'x') op = '*';
  if (op === '÷') op = '/';

  currentInput += op;
  result = '';
  updateDisplay();
}

function appendDot() {
  if (!currentInput.endsWith('.')) {
    currentInput += '.';
  }
  result = '';
  updateDisplay();
}

function clearAll() {
  currentInput = '';
  result = '';
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const finalResult = eval(currentInput);
    result = finalResult;
  } catch (e) {
    result = 'Error';
  }
  updateDisplay();
}
