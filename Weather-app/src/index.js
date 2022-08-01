let now = new Date();

function displayDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let formattedDate = `${day} ${hour}:${minutes}`;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${formattedDate}`;
}
displayDate();

function showWeather(response) {
  let chosenCity = response.data.name;
  let cityInput = document.querySelector(".chosenCity");
  cityInput.innerHTML = `${chosenCity}`;

  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = `${currentTemp} °C`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity-element");
  humidityElement.innerHTML = `${humidity} % 😶‍🌫️`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-element");
  windElement.innerHTML = `${wind} mph 💨`;

  let weatherDescription = response.data.weather.main;
  let descriptionNowElement = document.querySelector(
    "#description-now-element"
  );
  descriptionNowElement.innerHTML = `${weatherDescription}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "49c1fd21e6977b5bebe55ea0fd25e68a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function geolocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector(".currentLocation");
currentLocationButton.addEventListener("click", geolocate);

function enterCity(city) {
  let apiKey = "49c1fd21e6977b5bebe55ea0fd25e68a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputEmail1").value;
  enterCity(cityInput);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

//
