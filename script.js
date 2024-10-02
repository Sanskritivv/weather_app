const apiKey = '<enter api key here>'; 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const cityNameElem = document.getElementById('city-name');
const temperatureElem = document.getElementById('temperature');
const conditionElem = document.getElementById('condition');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            showError();
        }
    } catch (error) {
        showError();
    }
}

function displayWeather(data) {
    errorMessage.classList.add('hidden');
    weatherInfo.classList.remove('hidden');
    cityNameElem.textContent = data.location.name;
    temperatureElem.textContent = `Temperature: ${data.current.temp_c} °C`;
    conditionElem.textContent = `Condition: ${data.current.condition.text}`;
    humidityElem.textContent = `Humidity: ${data.current.humidity}%`;
    windElem.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
}

function showError() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}
