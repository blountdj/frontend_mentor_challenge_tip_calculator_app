const tipButtons = document.querySelectorAll(".tip__button");
const billInput = document.querySelector(".inputs__bill--input");
const peopleInput = document.querySelector(".inputs__people--input");
const errorBlock = document.querySelector(".inputs__people");
const customInputEl = document.querySelector(".input--custom");

const tipAmountEL = document.querySelector(".outputs__tip--amount");
const totalAmountEl = document.querySelector(".outputs__total--amount");

const buttonReset = document.querySelector(".button--reset");

let tipSelected = false;
let tipPercentage;
let billValue;
let peopleValue;
let tipTotal;

// TIP BUTTONS
function removeSelectedClass() {
  tipButtons.forEach((button) => {
    button.classList.remove("selected");
  });
}

function tipButtonClick() {
  tipPercentage = Number(this.getAttribute("data-percentage")) / 100;
  removeSelectedClass();
  customInputEl.value = "";
  this.classList.add("selected");
  tipSelected = true;
  runCalcator();
}

tipButtons.forEach((button) => {
  button.addEventListener("click", tipButtonClick);
});

// BILL INPUT
function billInputEvent() {
  billValue = Number(billInput.value);
  //   console.log(`billValue: ${billValue}`);
  runCalcator();
}

billInput.addEventListener("keyup", billInputEvent);

// PEOPLE INPUT
function peopleInputEvent() {
  peopleValue = Number(peopleInput.value);
  console.log(`peopleValue: ${peopleValue}`);
  errorBlock.classList.add("hidden");
  runCalcator();
}

peopleInput.addEventListener("keyup", peopleInputEvent);

// CALCULATIONS
function checkInputs() {
  //   console.log(`tipSelected: ${tipSelected}`);
  //   console.log(`peopleValue: ${peopleValue}`);
  //   console.log(`billValue: ${billValue}`);
  if (tipSelected && peopleValue && billValue) {
    return true;
  }
  if (tipSelected && !peopleValue && billValue) {
    errorBlock.classList.remove("hidden");
    return false;
  }
}

function runCalcator() {
  if (checkInputs()) {
    tipTotal = billValue * tipPercentage;
    totalAmountEl.textContent = `$${(
      (tipTotal + billValue) /
      peopleValue
    ).toFixed(2)}`;

    tipAmountEL.textContent = `$${(tipTotal / peopleValue).toFixed(2)}`;

    buttonReset.classList.add("active");
  }
}
// CUSTOM INPUT
function customInputFunc() {
  removeSelectedClass();
  tipPercentage = Number(this.value) / 100;
  tipSelected = true;
  runCalcator();
}

customInputEl.addEventListener("keyup", customInputFunc);

// RESET
function reset() {
  tipPercentage = null;
  billValue = null;
  peopleValue = null;

  billInput.value = billValue;
  removeSelectedClass();
  peopleInput.value = peopleValue;
  tipAmountEL.textContent = "$0.00";
  totalAmountEl.textContent = "$0.00";
  customInputEl.value = "";
  buttonReset.classList.remove("active");
  errorBlock.classList.add("hidden");
}

buttonReset.addEventListener("click", reset);

reset();
