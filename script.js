let displayNumber = '0';
let firstValue = null
let secondValue = null
let firstSign = null
let secondSign = null
let result = 0
let op = "";
let flag = false
const displayField = document.querySelector(".display")

const allButtons = document.querySelectorAll("button")

function updateDisplay(){
    const displayField = document.querySelector(".display")
    displayField.innerHTML = displayNumber
    if(displayNumber.length > 9){
        //displays number from index 0 to 8 (9 is not displayed)
        displayField.innerHTML = displayNumber.substring(0,9)
    }
}

updateDisplay()


function clickButtons(){
    for(let i=0; i < allButtons.length; i++){
        allButtons[i].addEventListener('click', function() {
            if(allButtons[i].classList.contains('numbers')){
                inputNumber(allButtons[i].value)
                //update after each number was changed
                updateDisplay()
            }else if(allButtons[i].classList.contains('clear')){
                displayNumber = '0';
                firstSign = null
                firstValue = null
                secondValue = null
                flag = false
                updateDisplay()
            }else if(allButtons[i].classList.contains('op')){
                inputSign(allButtons[i].value)
                updateDisplay()
            }else if(allButtons[i].classList.contains('equals')){
                inputEquals()
                updateDisplay()
            }else if(allButtons[i].classList.contains('percentage')){
                inputPercent()
                updateDisplay()
            }else if(allButtons[i].classList.contains('sign')){
                inputChangeSign()
                updateDisplay()
            }else if(allButtons[i].classList.contains('decimal')){
                inputDecimal(allButtons[i].value)
                updateDisplay()
            }
        }) 
    }
}

function inputNumber(number){
    //1st number
    if(firstValue === null){
        if(displayNumber === 0 || displayNumber === "0"){
            displayNumber = number
        }else{
            displayNumber += number
        }
    }else{
        //second number
        if(displayNumber === firstValue){
            flag = false;
            displayNumber = number
        }else{
            displayNumber += number
        }   
    }
}

clickButtons()

function inputSign(op){
    if(firstSign != null && secondSign === null){
        //assigning second sign
        secondSign = op
        secondValue = displayNumber
        displayNumber = calculate(Number(firstValue), Number(secondValue), firstSign)
        firstValue = displayNumber
        result = null
    }else if(firstSign != null && secondSign != null){
        secondValue = displayNumber
        displayNumber = calculate(Number(firstValue), Number(secondValue), secondSign)
        secondSign = op
        firstValue = displayNumber
    }else{
        firstValue = displayNumber
        firstSign = op
    }
}

function inputEquals(){
    if(firstSign === null){
        displayNumber = displayNumber
    }else if(secondSign != null){
        //second operation
        secondValue = displayNumber
        result = calculate(Number(firstValue), Number(secondValue), secondSign)
        if(result === 'no lol'){
            displayField === 'no lol'
        }else{
            displayNumber = result
            firstValue = displayNumber
            firstSign = null
            secondSign = null
            secondValue = null
            result = null
        }
    }else{
        secondValue = displayNumber
        result = calculate(Number(firstValue), Number(secondValue), firstSign)
        displayNumber = result
    }
}

function calculate(first, second, sign){
    switch(sign){
        case '+':
            return first + second
        case '-':
            return first - second
        case '*':
            return first * second
        case '/':
            if(second === 0){
                return 'no lol'
            }else{
                return first/second
            }
        default:
            return NaN
    }
}


function inputPercent(){
    displayNumber = displayNumber/100
}

function inputChangeSign(){
    displayNumber = displayNumber * -1
}

function inputDecimal(dot){
    if(!flag){
        displayNumber += dot;
        flag = true
    }
}