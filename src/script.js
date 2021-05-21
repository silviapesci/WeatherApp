function formatDate(date) {

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];

}

function displayForecast(response) {

  let apiForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = "";

  apiForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    
      forecastHTML = forecastHTML +
        `
    <div>
    <span id="days"> ${formatDay(forecastDay.dt)} </span>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="40" class="weather-icons"/>
    <span class="max-temperature">${Math.round(forecastDay.temp.max)}° /</span>
    <span class="min-temperature"> ${Math.round(forecastDay.temp.min)}°</span>
    </div>
    `
      }
    });


  forecast.innerHTML = forecastHTML;
}

let date = document.querySelector(".current-date");
let today = new Date();

date.innerHTML = formatDate(today);


function getForecast(coordinates) {

  console.log(coordinates);
  let apiKey = "f16ec4548e17c1cd3fffcb4a483b9d84";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}


function displayWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "f16ec4548e17c1cd3fffcb4a483b9d84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
  
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Milan");



