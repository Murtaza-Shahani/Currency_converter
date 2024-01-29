const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select"); // getting the drop downs
const btn = document.querySelector("form button"); // accessing the button
const fromCurr = document.querySelector(".from select"); // accessing from currency
const toCurr = document.querySelector(".to select"); // accessing to currency
const msg = document.querySelector(".msg"); // accessing the msg (final output)

for (let select of dropdowns) {
  for (currcode in countryList) {
    // getting country list from list.js and appending to selet options
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currcode === "PK") {
      // setting the selected curr selected
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}
const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img"); // getting the image url
  img.src = newsrc; //updating the image
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input"); // getting the entered amount
  let amval = amount.value;

  if (amval === "" || amval < 1) {
    // setting 0 and -ve value to 1
    amval = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL); // fetching the data
  let data = await response.json(); // converting json into obj
  let rate = data[toCurr.value.toLowerCase()]; // only getting the converted to rate

  //console.log(data);
  let famount = rate * amount.value;
  msg.innerText = `${amval} ${fromCurr.value} = ${famount} ${toCurr.value}`;
  console.log(famount);
});
