let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screens();
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}
function handleMath(value) {
  if (buffer === "0") {
    //do nothing
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperations(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
  console.log(runningTotal);
}
function flushOperations(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  } else if (previousOperator === "x") {
    runningTotal *= intBuffer;
  }
}
function handleSymbol(Symbol) {
  switch (Symbol) {
    case "C":
      buffer = "0";
      console.log("hey");
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperations(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "÷":
    case "x":
      handleMath(Symbol);
      break;
  }
}
function calc() {
  console.log("hi");
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}
function screens() {
  screen.innerText = buffer;
}
calc();
