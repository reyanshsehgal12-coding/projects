const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.button');
let expression = '';

function updateScreen() {
  screen.textContent = expression || '0';
}

function addValue(value) {
  if (expression.length >= 20) return;
  const last = expression[expression.length - 1];
  if ('+-*/'.includes(value)) {
    if (!expression || '+-*/'.includes(last)) return;
  }
  expression += value;
  updateScreen();
}

function calculate() {
  if (!expression) return;
  const last = expression[expression.length - 1];
  if ('+-*/'.includes(last)) return;
  try {
    const result = Function(`return ${expression}`)();
    expression = String(Number(result.toFixed(6)));
    updateScreen();
  } catch (error) {
    screen.textContent = 'Error';
    expression = '';
  }
}

function clearScreen() {
  expression = '';
  updateScreen();
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    if (value) {
      addValue(value);
      return;
    }

    if (button.id === 'clear') {
      clearScreen();
      return;
    }

    if (button.id === 'equals') {
      calculate();
      return;
    }
  });
});

updateScreen();