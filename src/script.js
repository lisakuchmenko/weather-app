// current day and time
let date = new Date();
let week = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
let day = week[date.getDay()];
let hours = date.getHours();
let minutes = date.getMinutes();

if (minutes < 10) {
	minutes = '0' + minutes;
}

let time = (document.querySelector(
	'#time'
).innerHTML = `${day} ${hours}:${minutes}`);

//API weather key
let apiKey = 'b28509bf2e3b7243f21402b7bfc8dac4';

//Weather update query selectors
let searchCity = document.querySelector('#search-city');
let curCity = document.querySelector('#current-city');
let curTemp = document.querySelector('#current-temp');
let curWeather = document.querySelector('#current-weather');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
let pressure = document.querySelector('#pressure');

//Update values function
function weatherUpdate(response) {
	console.log(response.data);
	console.log('hi');
	curCity.innerHTML = response.data.name;
	curTemp.innerHTML = Math.round(response.data.main.temp);
	curWeather.innerHTML = response.data.weather[0].main;
	humidity.innerHTML = response.data.main.humidity;
	wind.innerHTML = response.data.wind.speed.toFixed(1);
	pressure.innerHTML = response.data.main.pressure;
}

//weather by search
function formSearch(event) {
	event.preventDefault();
	let cityName = searchCity.value;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(weatherUpdate);
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', formSearch);

//weather by geolocation
function locationSearch() {
	navigator.geolocation.getCurrentPosition(function (position) {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;
		let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

		axios.get(apiUrl).then(weatherUpdate);
	});
}

let curLocation = document.querySelector('#location');
curLocation.addEventListener('click', locationSearch);

//Celicius to Farenheit
// let currentTemp = document.querySelector('#current-temp');
// let farenheit = document.querySelector('#farenheit');
// let celcius = document.querySelector('#celcius');

// celcius.addEventListener('click', function (event) {
// 	event.preventDefault();
// 	celcius.classList.add('focus');
// 	farenheit.classList.remove('focus');
// 	currentTemp.innerHTML = '21';
// });

// farenheit.addEventListener('click', function (event) {
// 	event.preventDefault();
// 	farenheit.classList.add('focus');
// 	celcius.classList.remove('focus');
// 	currentTemp.innerHTML = '70';
// });
