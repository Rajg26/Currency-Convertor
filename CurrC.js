const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const Dropdowns = document.querySelectorAll(".dropdown select"); // Select the actual <select> tags
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select")
let btn = document.querySelector(".btn")
for (let select of Dropdowns) {
    for (let currCode in countryList) { 
        let newOption = document.createElement("option");
        newOption.innerText = currCode; 
        newOption.value = currCode;
        
       if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        flagUpdate(evt.target) ;
        msgUpdate(fromCurrency,toCurrency)
    })
}

let Resetbtn = document.querySelector("#Rbtn");
Resetbtn.addEventListener("click",()=>{
    fromCurrency.value= "USD";
    toCurrency.value="INR";
    flagUpdate(fromCurrency);
    flagUpdate(toCurrency);
    DefaultValue();
    
    
})
let chngebtn = document.querySelector(".fa-solid.fa-arrow-right-arrow-left");

chngebtn.addEventListener("click", () => {
    let exchangeflag = fromCurrency.value;
    fromCurrency.value = toCurrency.value ; 
    toCurrency.value = exchangeflag ;

    flagUpdate(fromCurrency);
    flagUpdate(toCurrency);
    
    
});


function flagUpdate(flagCode){
    
    let countryValue = flagCode.value;
    let countryCode = countryList[countryValue];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png` ;
    let img = flagCode.parentElement.parentElement.querySelector("img") ;
    img.src = newScr ;
    
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#Amount");
    let amtVal = amount.value;
    
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    let msgAppear = document.querySelector(".msg");
    msgAppear.innerText = `${amtVal} ${fromCurrency.value} = ${finalAmount.toFixed(2)} ${toCurrency.value}`;
});
 
async function DefaultValue() {
    const URLDefault = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
    
    try {
        let responseDefault = await fetch(URLDefault);
        let dataDefault = await responseDefault.json();
        let DefaultValue1 = dataDefault.usd.inr;
        document.getElementById("text1").innerHTML = `<div>1 USD = ${DefaultValue1.toFixed(2)} INR</div>`;
        
    } catch (error) {
        console.error("Failed to fetch currency data:", error);
    }
}

DefaultValue();