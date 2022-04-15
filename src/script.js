function formatDate() {
	var e = new Date();
	let dayName = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let dayN = dayName[e.getDay()];
	let monthName = [
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
	let month = monthName[e.getMonth()];
	let hour = e.getHours();
	let minutes = e.getMinutes();
	let meridiem;
	if (hour > 12) {
		meridiem = "PM";
		hour = hour - 12;
	} else {
		meridiem = "AM";
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	document.getElementById(
		"time-label"
	).innerHTML = `${dayN}, ${month} ${hour}:${minutes} ${meridiem}`;
	setTimeout(formatDate, 1000);
}

function displayTemperature(response) {
	console.log(response.data);
	let temperature = response.data.main.temp.toFixed(1);
	let temperatureElement = document.getElementById("temp");
	temperatureElement.innerHTML = `${temperature}`;
	let nameCity = response.data.name;
	let nameCityElement = document.getElementById("location");
	nameCityElement.innerHTML = nameCity;
	let humidity = response.data.main.humidity;
	let humidityElement = document.getElementById("humidity");
	humidityElement.innerHTML = `${humidity}%`;
	let windSpeed = response.data.wind.speed;
	let windSpeedElement = document.getElementById("wind-speed");
	windSpeedElement.innerHTML = `${windSpeed}km/h`;
	let iconWheather = response.data.weather[0].main;
	let iconWheatherElement = document.getElementById("icon-wheather");
	let quoteElement = document.getElementById("quote");
	if (iconWheather === "Clear") {
		iconWheatherElement.innerHTML = `<img src="src/svg/sun-icon.svg" width="250px" />`;
		quoteElement.innerHTML = `"Sunshine and happiness go together like fish and chips!" (Catherine Pulsifer)`;
	} else if (iconWheather === "Rain") {
		iconWheatherElement.innerHTML = `<img src="src/svg/cloud-rain.svg" width="250px" />`;
		quoteElement.innerHTML = ` "Save a boyfriend for a rainy day – and another, in case it doesn’t rain."  (Mae West)`;
	} else if (iconWheather === "Snow") {
		iconWheatherElement.innerHTML = `<img src="src/svg/snow.svg" width="250px" />`;
		quoteElement.innerHTML = ` “Snow is…a beautiful reminder of life and all its quirks. It makes me pause. Think. Stay still. Even my mind takes the hint. It makes me feel giddy. Like a kid.” (R.B. O’Brien) `;
	} else {
		iconWheatherElement.innerHTML = `<img src="src/svg/cloud-sun.svg" width="250px" />`;
		quoteElement.innerHTML = `"Sunshine is delicious, rain is refreshing, wind braces us up, snow is
					exhilarating; there is really no such thing as bad weather, only
					different kinds of good weather." (John Ruskin)`;
	}
	//let labelWheather = document.getElementById("description");
	//labelWheather.innerHTML = iconWheather;
}
function handleC(event) {
	event.preventDefault();
	let tem = document.getElementById("temp");
	let converted = Math.round(
		(parseFloat(tem.textContent, 10) - 32) * (5 / 9)
	).toFixed(1);
	tem.innerHTML = converted;
}
function handleF(event) {
	event.preventDefault();
	let tem = document.getElementById("temp");
	let converted = Math.round(
		(parseFloat(tem.textContent, 10) * 9) / 5 + 32
	).toFixed(1);
	tem.innerHTML = converted;
}

function retrievePosition(position) {
	let apiKey = "2120c535876391f18db8ca2cc1fdc54e";
	let lat = position.coords.latitude.toFixed(2);
	let lon = position.coords.longitude.toFixed(2);
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(displayTemperature);
}
function handleCurrentLocation() {
	navigator.geolocation.getCurrentPosition(retrievePosition);
}

function loadData(city) {
	let myKey = "2120c535876391f18db8ca2cc1fdc54e";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myKey}`;
	axios.get(apiUrl).then(displayTemperature);
}

function handleClick() {
	let city = document.getElementById("city").value.toLowerCase();
	loadData(city);
}

window.onload = function initializeMyAwesomeApp() {
	// Function to be executed
	loadData("London");
};

//constants

const clink = document.getElementById("celcius");
const flink = document.getElementById("farin");
const btn = document.getElementById("change-city");
const btnCurrent = document.getElementById("current-city");

//main
formatDate();

btn.addEventListener("click", handleClick);
btnCurrent.addEventListener("click", handleCurrentLocation);

clink.addEventListener("click", handleC);
flink.addEventListener("click", handleF);
