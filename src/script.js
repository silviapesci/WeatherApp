let today = new Date();

let currentDay = document.querySelector(".current-day");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
currentDay.innerHTML = days[today.getDay()];

let currentHour = document.querySelector(".current-hour");
currentHour.innerHTML = today.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
};

let currentMinutes = document.querySelector(".current-minutes");
currentMinutes.innerHTML = today.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
};


function displayWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed); 
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



