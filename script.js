"use strict";
let numbers = document.querySelector(".numbers");
let functions = document.querySelector(".functions");
let output = document.querySelector(".output");
let input = document.querySelector(".input");
let number_disp = document.querySelector(".number_disp")

let btn_numbers = [];
let expression = [];
let expression_num_arr = [];
let expression_operators_arr = [];

//here we are handling numbers of the calculator
for ( let i = 0; i < 10; i++ ){
    btn_numbers[i] = document.getElementById(`${i}`);
    btn_numbers[i].addEventListener('click',number_press);
}

function number_press(){
    if (number_disp.textContent == 0){
        number_disp.textContent = "";
    }
    number_disp.textContent += this.getAttribute('id');
    if (number_disp.textContent.length>14){
        number_disp.textContent = "0";
    }
}

//handling functions of the calculator
let operator_values = {
    "-":1,
    "+":2,
    "*":3,
    "/":4
};

let operations = {
    "-":function(a,b){return (a-b)},
    "*":(a,b)=>a*b,
    "/":(a,b)=>(a/b).toFixed(2),
    "+":(a,b)=>a+b
};

let clear = document.querySelector('#clear');
clear.addEventListener('click',clearDisplay);

let deleteNums = document.querySelector('#del');
deleteNums.addEventListener('click',deleteNumbers);

let add = document.querySelector('#add');
add.addEventListener('click',addValue);

let subtract = document.querySelector('#subtract');
subtract.addEventListener('click',subtractValue);

let multiply = document.querySelector('#multiply');
multiply.addEventListener('click',multiplyValue);

let divide = document.querySelector('#divide');
divide.addEventListener('click',divideValue);

let calculate = document.querySelector('#calculate');
calculate.addEventListener('click',calculateValue);


function clearDisplay(){
    output.textContent = "0";
    input.textContent  = "0";
    number_disp.textContent = "0";
}

function deleteNumbers(){
    if (number_disp.textContent == 0 || number_disp.textContent.length == 1){
        number_disp.textContent = "0";
    }
    else{
        number_disp.textContent = number_disp.textContent.slice(0,-1);
    }
    
}
function addValue(){
    if (input.textContent == 0){
        input.textContent = "";
    }
    if (number_disp.textContent != 0){
        input.textContent += number_disp.textContent + " + ";
        number_disp.textContent = "0";    
      
    }
    else if (number_disp.textContent == 0 && input.textContent !=0){
        input.textContent += "0" + " + ";
    }
    else if(input.textContent != 0){
        input.textContent += " + ";
    }
    else{
        input.textContent = "0";
    }
}

function subtractValue(){
    if (input.textContent == 0){
        input.textContent = "";
    }
    if (number_disp.textContent != 0){
        input.textContent += number_disp.textContent + " - ";
        number_disp.textContent = "0";    
      
    }
    else if (number_disp.textContent == 0 && input.textContent !=0){
        input.textContent += "0" + " - ";
    }
    else if(input.textContent != 0){
        input.textContent += " - ";
    }
    else{
        input.textContent = "0";
    }
}

function multiplyValue(){
    if (input.textContent == 0){
        input.textContent = "";
    }
    if (number_disp.textContent != 0){
        input.textContent += number_disp.textContent + " * ";
        number_disp.textContent = "0";    
      
    }
    else if (number_disp.textContent == 0 && input.textContent !=0){
        input.textContent += "0" + " * ";
    }
    else if(input.textContent != 0){
        input.textContent += " * ";
    }
    else{
        input.textContent = "0";
    }
}

function divideValue(){
    if (input.textContent == 0){
        input.textContent = "";
    }
    if (number_disp.textContent != 0){
        input.textContent += number_disp.textContent + " / ";
        number_disp.textContent = "0";    
      
    }
    else if (number_disp.textContent == 0 && input.textContent !=0){
        input.textContent += "0" + " / ";
    }
    else if(input.textContent != 0){
        input.textContent += " / ";
    }
    else{
        input.textContent = "0";
    }
}

function calculateValue(){
    if (number_disp.textContent != 0){
        input.textContent += number_disp.textContent;
        number_disp.textContent = "0";
    }
    else if (number_disp.textContent == 0 && input.textContent !=0){
        input.textContent += "0";
    }
    if(input.textContent == 0){
        input.textContent = 0;//because otherwise it will consider " 0 " as two "" operators and 0 values which fucks up everything
    }
    expression = input.textContent.split(' ');    
    expression_operators_arr = input.textContent.split(' ').filter(isNaN);
    expression_num_arr = input.textContent.split(' ').filter(isFinite);

    sortOperators(expression_operators_arr);
    solveValues();
    
    if (output.textContent.length > 8){
        output.textContent = "OUT OF RANGE";
    }
    else{
        output.textContent = expression[0];
    }
    console.log(expression);
    console.log(expression_num_arr);
    console.log(expression_operators_arr);
    
}

function sortOperators(temp_arr){//sorts the operators according to their precedence
    for(let i = 0; i < temp_arr.length; i++){
        for(let j = 0; j < temp_arr.length-1; j++){
            if (operator_values[temp_arr[j]] < operator_values[temp_arr[j+1]]){
                let temp = temp_arr[j];
                temp_arr[j] = temp_arr[j+1];
                temp_arr[j+1] = temp;
                
            }
        }
    }
}

function solveValues(){//evaluates the expression with the help of sorted list of operators 
    //and expression array
    for(let i of expression_operators_arr){
       for(let j of expression){
            if(i==j){
                let first_val = Number(expression[ expression.indexOf(j) - 1]);
                let second_val = Number(expression[ expression.indexOf(j) + 1]);
                console.log(first_val)
                console.log(second_val)
                console.log(j)
                expression.splice(expression.indexOf(j)-1,3,operations[j](first_val,second_val))//tbd
                console.log(expression)
            }
       }
    }
}