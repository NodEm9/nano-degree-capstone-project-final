const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');


const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const { default: fetch } = require('node-fetch');

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Middleware
const cors = require('cors');
app.use(cors());


// const mockApiResponse = require('./mockAPI');

//BaseUrl to APIs

//Geonames base URL
const geonames_baseUrl = 'http://api.geonames.org/searchJSON?q=';
const geonamesAddParams = '&fuzzy=0.8&maxRow=1&lang=auto';

//WeatherBit base URL
const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';


//Pixabay base URl
const pixabay_baseUrl = 'https://pixabay.com/api/?';
const addParams = '&orientation=all&safesearch=true';
const pixCategory = '&category=travel'; 
const imageType = '&image_type=photo';


const GEONAMES_USERNAME = `&username=${process.env.GEONAMES_USERNAME}`;
const WEATHERBIT_API_KEY = `&key=${process.env.WEATHERBIT_API_KEY}`;
const PIXABAY_API_KEY = `key=${process.env.PIXABAY_API_KEY}&q=`;


const restCountries_baseUrl = 'https://restcountries.eu/rest/v2/alpha/';

app.use(express.static('dist'));

const port = process.env.PORT || 5000;
  

//Get routes
app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});


app.get('/getTripData', (req, res) => {
    res.send(tripPlan);

});


let tripPlan = {}; 

app.post('/createTrip', async (req, res) => {
  console.log(req.body);

let newData = req.body;
let newEntry = {
    id:            newData.id,
    placeName:     newData.placeName,
    departDate:    newData.departDate,  
    returnDate:    newData.returnDate,
    durartion:     newData.durartion,
    updateDaysCount:  newData. updateDaysCount
};

tripPlan = newEntry;
res.send(tripPlan);
res.json(tripPlan);


});


app.get('/geonamesData', (req, res) => {
console.log(req.body);

const url = `${geonames_baseUrl}${tripPlan.placeName}${geonamesAddParams}${GEONAMES_USERNAME}`;
fetch(url)
.then(res => res.json())
.then(data => {

console.log(data); 

tripPlan['lon'] = data.geonames[0].lng;
tripPlan['lat'] =  data.geonames[0].lat;
tripPlan['name'] = data.geonames[0].name; //toponymName
tripPlan['adminName'] = data.geonames[0].adminName1;
tripPlan['countryName'] = data.geonames[0].countryName;
tripPlan['code'] = data.geonames[0].countryCode;

res.send(data);

}).catch(err => {
 console.log({message: 'Cannot fetch: debbug: ' +  err});
 });
});

app.get('/weatherData', (req, res) => {
 console.log(req.body);
        
const url = `${baseUrl}lat=${tripPlan.lat}&lon=${tripPlan.lon}&lang=en&units=auto&start_date=${tripPlan.date}&end_date=${tripPlan.date}${WEATHERBIT_API_KEY}`;

fetch(url)  
.then(res => res.json())
.then(data => {

console.log(data);

tripPlan.icon = data.data[14].weather.icon;
tripPlan.temp = data.data[14].temp;  
tripPlan.humidity = data.data[14].rh;   
tripPlan.wind_spd = data.data[14].wind_spd;
tripPlan.description = data.data[14].weather.description;
       
res.send(data);
return data; 

}).catch (err => {
    console.log({message: 'fetch failed' + err});
});

});


app.get('/restCountries', (req, res) => {
    const url = `${restCountries_baseUrl}${tripPlan.code}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        tripPlan['demonym'] = data.demonym;
        tripPlan['currencyData'] = {
            code: data.currencies[0].code, 
            name: data.currencies[0].name, 
            symbol: data.currencies[0].symbol
        };
 
        res.send(data);
        return data;
          
    }).catch(err => {
        console.log({message: 'Cannot get rest countries data' + err});
    });
});

app.get('/pixabayImages', async(req, res) => {
    
const url = `${pixabay_baseUrl}${PIXABAY_API_KEY}${tripPlan.name}${imageType}${addParams}${tripPlan.city}${pixCategory}`;
await fetch(url)
.then(res => res.json())
.then( data => {


let cityImage = data.hits[0].webformatURL;

tripPlan.cityImage = cityImage;

res.send(data);
console.log(data);
return data;

}).catch(err => {
   console.log({message: 'Could not fetch image'  + err});
});
});




// app.get('/test', (req, res) => {
//           console.log(req.body);
//           res.send(mockApiResponse);
// });

app.listen(port, () => {
          console.log(`Server start on ${port}`);
});

