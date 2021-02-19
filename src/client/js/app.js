const { default: fetch } = require('node-fetch');
import { updateDaysCount } from './calcTrip';
import {  isValidInput } from './inputsValidation';
import ('regenerator-runtime/runtime');   

import localForage from 'localforage';

const form = document.querySelector('form');
const infoData = document.querySelector('[data-infos]');





const handleSubmit = async (event) => { 
event.preventDefault();             

//Get User inputs value
const placeName = document.querySelector('[data-place-name]').value;   
const departDate = document.querySelector('[data-departure-date]').value;
const returnDate = document.querySelector('[data-return-date]').value;

let inputText = { placeName, departDate, returnDate }; 

//Define key    
let inputsArray = [];
  
if (localStorage.getItem(inputsArray)) {
  inputsArray = JSON.parse(localStorage.getItem(inputsArray));  
} else {
  inputsArray = [];
}

//Call updateDaysCount function from calcTrip.js
updateDaysCount();         


if(isValidInput(inputText)){        
  console.log('input is valid!'); 

  fetch('http://localhost:5000/createTrip', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {     
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputText),  

  }).then(res => res.json())
  .then(data => {  

    //Store user input in localForage
    localForage.setItem(JSON.stringify(inputsArray), inputText).then((inputText) => {
      console.log('setItem completed', inputText);

      return localForage.getItem(inputText); 
    });

    inputText.value = '';

  return data;

  }).catch(err => {
    console.log({message: 'Update problem'} + err);
  });


//fetch the url endpoint and us promise.all array to collection all results 
let link1 = await fetch('http://localhost:5000/geonamesData');
let link2 = await fetch('http://localhost:5000/pixabayImages');
let link3 = await fetch('http://localhost:5000/weatherData');
let link4 = await fetch('http://localhost:5000/restCountries');   

Promise.all([ link1, link2,  link3, link4 ])
.then(results => {
if(results === null) {

  console.log('No results returned:');
}else{

  results.forEach(result => {      
  linkData( result.json() );
  updateDisplay();
  });
 }     
});
  
 }else{
   console.log('Invalid: Enter a country or city as destination');  
} 
}; 



//Get the return response        
const linkData = (result) =>{ 
  const linkParams = ({           
  method: 'GET',       
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
 },
});
result.then(data => {
 if(linkParams.result === undefined){           

  console.log( result);
}else{
      return result.linkParams(data);  
   }   
 });  
};  



  //Add eventListner to the get/retrieve button to retrieve stored data
document.querySelector('[data-get-btn]').addEventListener('click', () => {
    let key = document.querySelector('[data-place-name]').value;
     
    localForage.getItem(key).then((inputText) => {
      console.log('getItem retrieved this', inputText);
      updateDisplay(inputText);  
  
    });   
  });
      
         
//Iterate over all stored data
document.querySelector('[data-save-trip]').addEventListener('click', () => {
 
    localForage.iterate((inputsArray, inputText, itrNum) => {
        console.log(itrNum, [inputsArray, inputText]);

  }).then(() => {
    console.log('iteratin complete');
  });
});
 
    
//Select DOM elements to update the UI with user input and API responses
const countryName = document.querySelector('[data-country-name]');
const name = document.querySelector('[data-city-name]');
 
//Select the weatherBit DOM elements
const temp = document.querySelector('[data-temp]');
const humidity = document.querySelector('[data-humidity]');
const wind_spd = document.querySelector('[data-wind-speed]');  
const description = document.querySelector('[data-description]');
const icon = document.querySelector('[data-weather-icon]'); 

//Select the user inputs DOM elements
const departDate = document.querySelector('[data-depart-date]');
const returnDate = document.querySelector('[data-returndate]');
const duration = document.querySelector('[data-trip-duration]');

//Select the RESTCountries DOM elements
const demonym = document.querySelector('[data-demonym]');
const currencyCode = document.querySelector('[data-currency-code]');
const currencyName = document.querySelector('[data-currency-name]');
const currencySymbol = document.querySelector('[data-currency-symbol]');

 
 
//Update UI
const updateDisplay = async() => {
 
 await fetch('http://localhost:5000/getTripData').then(res => res.json()) 
 .then( data => {
 if(data === undefined){         
  
    console.log('data not found:');   
}else{     
    console.log(data);

//Update trip details to UI
countryName.textContent = data.countryName;
name.textContent =        data.name;
departDate.textContent  = data.departDate;
returnDate.textContent = data.returnDate;
duration.textContent = data.duration;
    
//Update weather info  to UI
icon.textContent = data.icon;   
temp.textContent  = data.temp;     
humidity.textContent = data.humidity;       
wind_spd.textContent = data.wind_spd;         
description.textContent = data.description; 

//Update RESTCountries to UI 
 demonym.textContent = data.demonym;
 currencyCode.textContent = data.currencyData.code;
 currencyName.textContent = data.currencyData.name;   
 currencySymbol.textContent = data.currencyData.symbol;

  
 //Update images                  
let cityImage = document.querySelector('[data-city-image]');   

//Set image-size 
cityImage.style.width = '100%'; 
cityImage.style.height = '380px'; 


if(data.cityImage === null && data.cityImage < 1) {

  console.log('Images not fount');  
}else{  
        
  cityImage.setAttribute('src', data.cityImage);   
 }

} 

}).catch(err => {

  console.log({ message: 'Error! cannot update UI'}  + err);
 });
    
};

// Print Button Function
const printBtn = () => {
  window.print(infoData);
  location.reload();
  infoData.style.display = 'none';
  if(window.print()){
    form.style.outlineColor = 'black';
  }
};

// Delete Button Function
const deleteBtn = () => {
  form.reset();
  location.reload();  
};        
 


 
export { handleSubmit,  printBtn, deleteBtn };