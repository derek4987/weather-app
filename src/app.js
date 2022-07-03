// single page weather app js 

let didExecute =true;
let weatherConstructor = {};

// functions to import

// default background and weather data
const initialPage = () => {
    let defaultValue = 'Kansas+City';
    unsplashBg(defaultValue);
    openWeather()
        .then(function() {
            if (didExecute === true) {
                displayData();
            } else return
        });
    document.querySelector('.weatherSearch').value = '';
}

// update background
const searchCity = () => {
    const seachButton = document.querySelector('#searchButton');
    seachButton.addEventListener('click', function(e) {
        weatherConstructor = {};
        openWeather()
            .then(function() {
                if (didExecute === true){
                    updateBg();
                    displayData();
                } else return;
            });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key ==='Enter' && document.querySelector('.weatherSearch') === document.activeElement) {
            openWeather()
                .then(function() {
                    if (didExecute === true){
                        updateBg();
                        displayData();
                    } else return;
                });
        }
    });    
}

export { initialPage };
export { searchCity };


// background image
// load unsplash image
function unsplashBg(value) {
    const img = document.querySelector('#bgImage');
    const client_id = "v1qiZp2SUUh-SN7uY-Kg5s8qkPtUgcj3vHM_dSGuwTI"
    fetch(`https://api.unsplash.com/search/photos?query=${value}&client_id=${client_id}`)
        .then(function(response) {    
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            let selectedPhoto = Math.floor(Math.random() * 10);
            img.src = response.results[selectedPhoto].urls.regular;
            // response.results.forEach(photo => {
            //     img.src = photo.urls.regular;
            // });
        })
        .catch(function() {
            // add default image or message to DOM if it fails
            console.log('Cannot retrieve data');
        });
}

function updateBg() {
    let searchValue = document.querySelector('.weatherSearch').value;
    searchValue = searchValue.split(' ').join('+');
    unsplashBg(searchValue);
}

// weather data
// fetch data with open weather api
async function openWeather() {
    let cityInput = document.querySelector('.weatherSearch').value;
    if (cityInput === '') {
        cityInput = 'Kansas City';
    }
    const api_key = '3e5943bf2df310039c464f9b62bbd804';

    try {
        didExecute = true;
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&APPID=${api_key}`);
        const responseData = await response.json();
        console.log(responseData);

        const city = await responseData.name;
        const temp = await responseData.main.temp;
        const tempHigh = await responseData.main.temp_max;
        const tempLow = await responseData.main.temp_min;
        const humidity = await responseData.main.humidity;
        const feelsLike = await responseData.main.feels_like;
        const description = await responseData.weather[0].main;
        const windSpeed = await responseData.wind.speed;

        const weatherData = new WeatherData(city,temp,tempHigh,tempLow,humidity,feelsLike,description,windSpeed);
        weatherConstructor = weatherData;
        console.log(weatherConstructor);
        console.log(weatherConstructor.city);
        return weatherConstructor;
    } catch(err) {
        didExecute = false;
        err = 'City not found';
        alert(err);        
    }
    
    
}

// weather data constructor
function WeatherData(city, temp, tempHigh, tempLow, humidity, feelsLike, description, windSpeed) {
    this.city = city;
    this.temp = temp;
    this.tempHigh = tempHigh;
    this.tempLow = tempLow;
    this.humidity = humidity;
    this.feelsLike = feelsLike;
    this.description = description;
    this.windSpeed = windSpeed;
}

// display data on DOM
function displayData() {
    const city = document.querySelector('#city');
    const description = document.querySelector('#description');
    const temp = document.querySelector('#temp');
    const tempHigh = document.querySelector('#tempHigh');
    const tempLow = document.querySelector('#tempLow');
    const humidity = document.querySelector('#humidity');
    const feelsLike = document.querySelector('#feelsLike');
    const windSpeed = document.querySelector('#windSpeed');

    city.textContent = `${weatherConstructor.city}`;
    description.textContent = `${weatherConstructor.description}`;
    temp.textContent = `${Math.round(weatherConstructor.temp)}\u00B0`;
    tempHigh.textContent = `H:${Math.round(weatherConstructor.tempHigh)}\u00B0`;
    tempLow.textContent = `L:${Math.round(weatherConstructor.tempLow)}\u00B0`;
    humidity.textContent = `${weatherConstructor.humidity}%`;
    feelsLike.textContent = `${Math.round(weatherConstructor.feelsLike)}\u00B0`;
    windSpeed.textContent = `${Math.round(weatherConstructor.windSpeed * 100)/100} km/hr`;
}

// loading animation
function loading() {
    console.log('future loading animation');
}