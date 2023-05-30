let firstNumber = "";
let secondNumber = "";
let operator = null;
let answer = null;
let firstDecimalPoint = false;
let secondDecimalPoint = false;
const buttons = document.querySelectorAll("button");
const upperScreen = document.querySelector(".upperScreen");
const lowerScreen = document.querySelector(".lowerScreen");

// This function detects which button has been pressed and effects changes to suit the button's purpose;
function getButtonChoice() {
    for (const button of buttons) {
        button.addEventListener("click", () => {
            switch(true) {
            case (button.classList.contains("number")):
                appendNumbers(button);
                break;
            case (button.classList.contains("operator") && (firstNumber !== "") && (secondNumber === "")):
                appendOperator(button);
                break;
            case (button.classList.contains("operator") && (firstNumber !== "") && (secondNumber !== "")):
                chooseOperation();
                appendOperator(button);
                break;
            case (button.classList.contains("equals") && (firstNumber !== "") && (secondNumber !== "")):
                chooseOperation();
                operator = null;
                break;
            case (button.classList.contains("clear")):
                clear();
                break;
            case (button.classList.contains("backspace")):
                deleteNumber();
            }
        });
    }
}

// This function controls the input to the firstNumber and secondNumbe variables;
function appendNumbers(button) {
    if (operator === null && answer === null && firstNumber.length < 10) {
        if (button.classList.contains("decimalPoint") && firstDecimalPoint === false) {
            firstNumber += ".";
            firstDecimalPoint = true;
        } else if (button.classList.contains("decimalPoint") === false) {
            firstNumber += button.innerText;
        }
        upperScreen.innerText = "";
        lowerScreen.innerText = firstNumber;
    } else if (operator !== null && secondNumber.length < 10) {
        if (button.classList.contains("decimalPoint") && secondDecimalPoint === false) {
            secondNumber += ".";
            secondDecimalPoint = true;
        }   else if (button.classList.contains("decimalPoint") === false) {
            secondNumber += button.innerText;
        }
            upperScreen.innerText = `${firstNumber} ${operator}`;
            lowerScreen.innerText = secondNumber;
    }
}

// This function controls the input to the operator variable;
function appendOperator(button) {
    if (button.classList.contains("add")) {
        operator = "+";
    } else if (button.classList.contains("subtract")) {
        operator = "-";
    } else if (button.classList.contains("multiply")) {
        operator = "*";
    } else if (button.classList.contains("divide")) {
        operator = "/";
    }
    upperScreen.innerText = `${firstNumber} ${operator}`;
}

// This function conducts the desired operation with the three given variables that are decided when the user presses the buttons;
function chooseOperation () {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch (true) {
    case (operator === "+"):
        answer = firstNumber + secondNumber;
        break;
    case (operator === "-"):
        answer = firstNumber - secondNumber;
        break;
    case (operator === "*"):
        answer = firstNumber * secondNumber;
        break;
    case (operator === "/"):
        let flag = checkForZero(); // Won't allow division by zero;
        if (flag === true) return;
        answer = firstNumber / secondNumber;
    }

    if (Number.isInteger(answer) === false) answer = parseFloat(Number(answer).toFixed(3)); // Won't allow more than three decimal places in an answer and will remove trailing zeros;
    if (answer.toString().length > 10) answer = answer.toPrecision(11); // Won't allow more than eleven figures on the calculator display and will remove trailing zeros;
    firstDecimalPoint = false;
    secondDecimalPoint = false;
    upperScreen.innerText = `${firstNumber} ${operator} ${secondNumber}`;
    lowerScreen.innerText = answer;
    firstNumber = answer;
    secondNumber = "";
}

// This function is called during division to ensure that divison by zero does not cause the program to crash;
function checkForZero () {
    if (secondNumber === 0) {
        clear();
        lowerScreen.innerText = "lol";
        return true;
    } else {
        return false;
    }
}

// This function works like a backspace by deleting unwanted number inputs;
function deleteNumber() {
    if (operator === null && answer === null && (firstNumber !== "")) {
        firstNumber = firstNumber.slice(0, -1);
        lowerScreen.innerText = firstNumber;
    } else if (operator !== null && secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
        lowerScreen.innerText = secondNumber;
    }
}

// This function restores all variables to their inital state;
function clear() {
    firstNumber = "";
    secondNumber = "";
    operator = null;
    answer = null;
    firstDecimalPoint = false;
    secondDecimalPoint = false;
    upperScreen.innerText = "";
    lowerScreen.innerText = "";
}

// Main program;
getButtonChoice();