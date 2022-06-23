// single page weather app js 

let didExecute =true;
let weatherConstructor;

// functions to import

// default background and weather data
const initialPage = () => {
    let defaultValue = 'Kansas+City';
    unsplashBg(defaultValue);
}

// update background
const searchCity = () => {
    const seachButton = document.querySelector('#searchButton');
    seachButton.addEventListener('click', function(e) {
        openWeather();
        if (didExecute === true){
            updateBg();
        } else return;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key ==='Enter' && document.querySelector('.weatherSearch') === document.activeElement) {
            openWeather();
            if (didExecute === true) {
                updateBg();
            } else return;
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
    const cityInput = document.querySelector('.weatherSearch').value;
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
        console.log(weatherData);
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