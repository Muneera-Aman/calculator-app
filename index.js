const display = document.getElementById("Display");
const history = document.getElementById("history");
console.log(data);

function AppendtoDisplay(v){
  display.value += v;
}

function clearDisplay(){
  display.value = "";
}

function backspace(){
  display.value = display.value.slice(0,-1);
}

function calculate(){
  try {
    let result = eval(display.value); // OK for assignment now (stable version)
    history.innerHTML = display.value + " = " + result + "<br>" + history.innerHTML;
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

/* tabs */
function showCalc(){
  document.getElementById("calc").classList.add("show");
  document.getElementById("conv").classList.remove("show");

  tab1.classList.add("active");
  tab2.classList.remove("active");
}

function showConv(){
  document.getElementById("conv").classList.add("show");
  document.getElementById("calc").classList.remove("show");

  tab2.classList.add("active");
  tab1.classList.remove("active");
}

/* currency */
async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const resultDiv = document.getElementById("result");

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerText = "Enter valid amount";
    return;
  }

  try {
    const res = await fetch(
      `https://api.fxratesapi.com/latest?base=${from}`
    );

    const data = await res.json();

    console.log(data);

    if (!data.rates || !data.rates[to]) {
      resultDiv.innerText = "API response error";
      return;
    }

    const result = amount * data.rates[to];

    resultDiv.innerText = `${amount} ${from} = ${result.toFixed(2)} ${to}`;

  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Network blocked or API unreachable";
  }
}

let historyList = [];

function updateHistory(expr, result) {
  const entry = `${expr} = ${result}`;
  historyList.unshift(entry);

  localStorage.setItem("history", JSON.stringify(historyList));

  document.getElementById("history").innerHTML =
    historyList.map(h => `<div>${h}</div>`).join("");
}

