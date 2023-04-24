let now = new Date();
let currentDay = document.querySelector("#day");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[now.getDay()];
currentDay.innerHTML = `${day}`;
let currentDate = document.querySelector("#date");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
currentDate.innerHTML = `${date} ${month}`;
let currentTime = document.querySelector("#time");
let hours = now.getHours();
let minutes = now.getMinutes();
currentTime.innerHTML = `${hours}:${minutes}`;

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.city;
  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(celsiusTemperature);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}`;
  let wind = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#windSpeed");
  currentWindSpeed.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.temperature.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity} %`;
  let description = response.data.condition.description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
  let icon = response.data.condition.icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute = ("src", response.data.condition.icon_url);
  iconElement.setAttribute = ("alt", `${icon}`);
}

function fahrenheitConvertation(event) {
  event.preventDefault();
  let tempIndicator = document.querySelector("#temperature");
  let fahrenheitTemp = (tempIndicator.innerHTML * 9) / 5 + 32;
  tempIndicator.innerHTML = Math.round(fahrenheitTemp);
}

function celsiusConvertation(event) {
  event.preventDefault();
  let tempIndicator = document.querySelector("#temperature");
  tempIndicator.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitTemperature = document.querySelector("#f-link");
fahrenheitTemperature.addEventListener("click", fahrenheitConvertation);

let cTemperature = document.querySelector("#c-link");
cTemperature.addEventListener("click", celsiusConvertation);

function search(city) {
  let apiKey = "17088b38703oa6f4t80cf35e7ba47449";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city").value;
  search(city);
}

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("click", changeCity);

search("Paris");
