var currDisplay = document.querySelector('.curr-display')
var prevDisplay = document.querySelector('.prev-display');
var numbers = document.querySelectorAll(".number");
var operands = document.querySelectorAll(".operation");
var clearBtn = document.querySelector(".clear");
var delBtn = document.querySelector(".delete");
var equalBtn = document.querySelector(".equal");
var operation;
function appendNumber(number) {
    if (currDisplay.innerText.includes('.') && number == '.') return;
    currDisplay.innerText += number;

}
function chooseOperation(operand) {
    if (currDisplay.innerText == '') return;
    compute(operand)
    operation = operand
    currDisplay.innerText += operand
    prevDisplay.innerText = currDisplay.innerText
    currDisplay.innerText = ''

}

function cleardisplay() {
    currDisplay.innerText = '';
    prevDisplay.innerText = '';
}
function buttonanimation(currentKey) {
    if(currentKey=='.') currentKey='dot';
    var activeButton = document.querySelector(".btn" + currentKey);
    activeButton.classList.add("loyal");
    setTimeout(function () {
        activeButton.classList.remove("loyal");
    }, 100);
}
function buttonanimationOperand(currentKey) {
    if(currentKey=='+') currentKey='add';
    if(currentKey=='-') currentKey='sub';
    if(currentKey=='/') currentKey='divi';
    if(currentKey=='*') currentKey='mul';
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("loyal");
    setTimeout(function () {
        activeButton.classList.remove("loyal");
    }, 100);
}

document.addEventListener("keydown", function (event) {
    console.log(event.key)
    if (event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9 || event.key == 0 || event.key == '.') {
        appendNumber(event.key);
        buttonanimation(event.key)
    }
    if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
        console.log(event.key)
        chooseOperation(event.key)
        buttonanimationOperand(event.key)
    }
    if (event.key == '=' || event.key == 'Enter') {
        compute();
        buttonanimationOperand('equal')
        prevDisplay.innerText = ''
    }
    if (event.key == 'Backspace') {
        buttonanimationOperand('clear')
        cleardisplay();
    }
    if (event.key == "Delete") {
        // console.log('Del');
        buttonanimationOperand("delete")
        currDisplay.innerText = currDisplay.innerText.slice(0, -1);
    }
});

numbers.forEach((number) => {
    number.addEventListener("click", (equal) => {
        appendNumber(number.innerText);
        buttonanimation(equal.target.innerText)
    })
})
operands.forEach((operand) => {
    operand.addEventListener("click", (e) => {
        // console.log(operand.innerText);
        chooseOperation(operand.innerText);
        buttonanimationOperand(e.target.innerText)

    })
})
clearBtn.addEventListener("click", function () {
    cleardisplay();
    buttonanimationOperand('clear')
})
equalBtn.addEventListener("click", function () {
    compute();
    prevDisplay.innerText = '';
    buttonanimationOperand('equal')
})
delBtn.addEventListener("click", function () {
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
    buttonanimationOperand("delete")
});

function compute(operand) {
    var result;
    var previousValue = parseFloat(prevDisplay.innerText)
    var nextValue = parseFloat(currDisplay.innerText)
    if (isNaN(previousValue) || isNaN(nextValue)) return;
    switch (operation) {
        case '+':
            result = previousValue + nextValue
            break;
        case '-':
            result = previousValue - nextValue
            break;
        case '*':
            result = previousValue * nextValue
            break;
        case '/':
            result = previousValue / nextValue
            break

        default:
            return;
    }
    currDisplay.innerText = result;
}