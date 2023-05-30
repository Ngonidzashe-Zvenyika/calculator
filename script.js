let firstNumber = "";
let secondNumber = "";
let operator = null;
let answer = null;
let firstDecimalPoint = false;
let secondDecimalPoint = false;
const buttons = document.querySelectorAll("button");
const upperScreen = document.querySelector(".upperScreen");
const lowerScreen = document.querySelector(".lowerScreen");

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
            if (secondNumber === 0) {
                clear();
                lowerScreen.innerText = "lol";
                return;
            } else {
                answer = firstNumber / secondNumber;
                if (Number.isInteger(answer) === false) answer = parseFloat(answer.toFixed(3));
            }
    }

    if (answer.toString().length > 10) {
        console.log(answer.toString().length);
        answer = answer.toPrecision(10);
    }
    upperScreen.innerText = `${firstNumber} ${operator} ${secondNumber}`;
    lowerScreen.innerText = answer;
    firstNumber = answer;
    secondNumber = "";
}

function getButtonChoice() {
    for (const button of buttons) {
        button.addEventListener("click", () => {
            switch(true) {

                case (button.classList.contains("number")):
                    if (operator === null && answer === null && firstNumber.length < 10) {
                        if (button.classList.contains("decimalPoint") && firstDecimalPoint === false) {
                            firstNumber += ".";
                            firstDecimalPoint = true;
                        } else if (!(button.classList.contains("decimalPoint"))) {
                            firstNumber += button.innerText;
                        }
                        upperScreen.innerText = "";
                        lowerScreen.innerText = firstNumber;
                    } else if (operator !== null && secondNumber.length < 10) {
                        if (button.classList.contains("decimalPoint") && secondDecimalPoint === false && secondNumber.length < 10) {
                            secondNumber += ".";
                            secondDecimalPoint = true;
                        } else if (!(button.classList.contains("decimalPoint"))) {
                            secondNumber += button.innerText;
                        }
                        upperScreen.innerText = `${firstNumber} ${operator}`;
                        lowerScreen.innerText = secondNumber;
                    }
                    break;

                case (button.classList.contains("operator") && (firstNumber !== "") && (secondNumber === "")):
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
                    break;
                
                case (button.classList.contains("operator") && (firstNumber !== "") && (secondNumber !== "")):
                    chooseOperation();
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
                    console.log(4);
                    break;

                case (button.classList.contains("equals") && (firstNumber !== "") && (secondNumber !== "")):
                    chooseOperation();
                    operator = null;
                    break;

                case (button.classList.contains("clear")):
                    clear();
                    break;

                case (button.classList.contains("backspace")):
                    if (operator === null && answer === null && (firstNumber !== "")) {
                        firstNumber = firstNumber.slice(0, -1);
                        lowerScreen.innerText = firstNumber;
                    } else if (operator !== null && secondNumber !== "") {
                        secondNumber = secondNumber.slice(0, -1);
                        lowerScreen.innerText = secondNumber;
                    }
            }
        })
    }
}

getButtonChoice();