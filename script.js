const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

const message = document.querySelector(".msg");

let currencyFullNames = {};

const currencyname = async()=>{
    let currnameurl = "";
    let response = await fetch(currnameurl);
    currencyFullNames = await response.json();
}

const displayoptions = async ()=>{
    for(let select of dropdowns){
        await currencyname();
        for(currcode in countryList){
            let newOption = document.createElement("option");
            let name = currencyFullNames[currcode];
            newOption.innerText = `${currcode} - ${name}`;
            newOption.value = currcode;
            if(select.name ==="from" && currcode==="USD"){
                newOption.selected = "selected";
            }else if(select.name ==="to" && currcode==="INR"){
                newOption.selected = "selected";
            }
            select.append(newOption);
        }
        select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
        });
    }
}

const updateflag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc = ``;
    let img = element.parentElement.querySelector("img");
    img.src= newsrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updataexchangerate();
});

const updataexchangerate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    const fc = fromcurr.value;
    const tc = tocurr.value;
    const baseurl = ``;
    let response = await fetch(baseurl);
    let data = await response.json();
    let rate = data[fc.toLowerCase()][tc.toLowerCase()];
    console.log(rate);
    let finalamount = amtval*rate;
    message.innerHTML = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
}

window.addEventListener("load",async() =>{
    await displayoptions();
    updataexchangerate();
});

