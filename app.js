const screenEl = document.querySelector(".screen");
const popUpEl = document.querySelector(".popUp");
const leftNavBarEl = document.querySelector(".leftNavBar");
const rightNavBarEl = document.querySelector(".rightNavBar");
const mainContainerEl = document.querySelector(".mainContainer");
const leftmenuBarEl = document.querySelector(".leftmenuBar");
const rightmenuBarEl = document.querySelector(".rightmenuBar");
const displayTransactionEl = document.querySelector(".displayTransaction");
const contentEl = document.querySelector(".content");
const allTransactionEl = document.querySelector(".allTransaction");
const transactionContentEl = document.querySelector(".transactionContent");
let leftMenuItems = ["Withdrawal", "Deposit", "Balance", "Reset"]
let rightMenuItems = ["Withdrawal", "Deposit", "Balance", "Reset"];
let image1 = '<img src="https://cdn.pixabay.com/photo/2013/03/29/13/39/next-97612_960_720.png"width=80%;/>';
let image2 = '<img src="https://cdn.pixabay.com/photo/2013/07/13/10/35/arrow-157549_1280.png" width=80%;/>';
let totalAmount = 20000;
let allTransactionInputEl = document.querySelector('.allTransaction input');
let transactionButtonEl = document.querySelector(".transactionButton button");
let divRemainingAmount = document.querySelector(".remainingAmount");
let lblRemainingAmountEl = document.querySelector(".remainingAmount label");
let pinEl = document.querySelector(".inputBtn input");
let okButtonEl = document.querySelector(".inputBtn button");

let strClicked = '';

function okClick() {
    if(pinEl.value==="" || pinEl.value===0)
        {
            pinEl.value = "";
            alert("Invalid Pin");
            return;
        }
        else if(pinEl.value>9999)
        {
            pinEl.value = "";
            alert("Pin exceeds maximum limit of 4");
            return;
        }
        screenEl.style.display = "flex";
        popUpEl.style.display = "none";
        Proceed();
}
function Proceed()
{
contentEl.innerHTML = "Select a transaction";
transactionContentEl.hidden=true;
// divRemainingAmount.hidden=true;
createLeftMenuButton();
createRightMenuButton();
createArrows(image1, leftNavBarEl);
createArrows(image2, rightNavBarEl);
}
function createLeftMenuButton() {
    leftMenuItems.forEach(item => {
        const left_menu_btn = document.createElement('button');
        left_menu_btn.setAttribute("class", "left-menu-btn");
        leftmenuBarEl.append(left_menu_btn);
        left_menu_btn.textContent = item;
        left_menu_btn.addEventListener('click', () => {
            if (item === "Withdrawal") {
                withdrawal();
            }
            else if (item === "Deposit") {
                Deposit();
            }
            else if (item === "Balance") {
                Amount();
            }
            else {
                transactionContentEl.innerHTML = lblRemainingAmountEl.innerHTML="";
            }
        });
    });
}
function createRightMenuButton() {
    rightMenuItems.forEach(item => {
        const right_menu_btn = document.createElement('button');
        right_menu_btn.setAttribute("class", "right-menu-btn");
        rightmenuBarEl.append(right_menu_btn);
        right_menu_btn.textContent = item;
        right_menu_btn.addEventListener('click', () => {
            if (item === "Withdrawal") {
                withdrawal();
            }
            else if (item === "Deposit") {
                Deposit();
            }
            else if (item === "Balance") {
                Amount();
            }
            else { 
                transactionContentEl.innerHTML = lblRemainingAmountEl.innerHTML="";
            }
        });
    });
}

function createArrows(arrowIMG, navBarEl) {
    for (let i = 1; i <= 4; i++) {
        const arrowEl = document.createElement('button');
        arrowEl.setAttribute("class", "navArrow");
        arrowEl.innerHTML = arrowIMG;
        navBarEl.appendChild(arrowEl);
        if (i===1)
           { arrowEl.addEventListener('click', () => {
                withdrawal();});
           }
        else if (i===2)
            { arrowEl.addEventListener('click', () => {
                 Deposit();});
            }
        else if (i===3)    
            {
                arrowEl.addEventListener('click', () => {
                Amount();});           
            }
            else
            {
                arrowEl.addEventListener('click', () => {
                transactionContentEl.innerHTML = lblRemainingAmountEl.innerHTML="";});                        
            }
    }
}
function btnOkClick(){
    if(allTransactionInputEl.value<=0){
        alert("Amount cannot be less than or equal to zero");
        return;
    }
    if(strClicked==="Deposit"){
        Enable(true) ;
        let newBalance = totalAmount+parseInt(allTransactionInputEl.value);
        lblRemainingAmountEl.innerHTML = "New Balance: " + String(newBalance);
        totalAmount = newBalance;
        return;
    }
    TransactionLimit();
    if(allTransactionInputEl.value<=totalAmount){
        Enable(true) ;
        let remainingBalance = totalAmount-parseInt(allTransactionInputEl.value);
        lblRemainingAmountEl.innerHTML = "Balance Amount: " + String(remainingBalance);
        totalAmount = remainingBalance;
    }
    //Enable(true);
}
function Enable(setValue){
    allTransactionInputEl.hidden = setValue;
    transactionButtonEl.hidden = setValue;    
    divRemainingAmount.hidden=!setValue;
    transactionContentEl.hidden= setValue;
}
function withdrawal() {
    strClicked = "Withdrawal";
    Enable(false);
    transactionContentEl.innerHTML = "Enter the Amount to withdraw";
    currentInputs = allTransactionInputEl.value = "";
}
function InsertClick() {
    pinEl.disabled = false;
    okButtonEl.disabled = false;    
}
function TransactionLimit(){
    if (allTransactionInputEl.value > totalAmount) {
        alert('Maximum amount allowed is :' + totalAmount);        
    }
}
function onNumPadClick(input) {
    if (input === -1) {
        allTransactionInputEl.value = '';
        return;
    }
    allTransactionInputEl.value += input;
}
function Deposit()
{
    strClicked = "Deposit";
    Enable(false);
    transactionContentEl.innerHTML = "Enter the Amount to deposit";
    currentInputs = allTransactionInputEl.value = "";
}
function Amount()
{
        Enable(true);
        transactionContentEl.innerHTML = "Balance Amount";
        lblRemainingAmountEl.innerHTML = "Total balance in the account: " + String(totalAmount);
}
