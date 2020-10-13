const weather = document.querySelector(".js-weather");

const API_KEY = "46a350d3eb2f509beb8465e04847068e";
const COORDS = "coords";
const UNITS = "metric"; // metric(Celsius) or imperial(Fahrenheit)

const getWeather = (lat, lon) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`
    ).then((response) => {
        return response.json();
    }).then((json) => {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}˚ @ ${place}`
    });
};

const saveCoords = (coordsObj) => {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleGeoSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
};

const handleGeoError = () => {
    console.log("can't access geo location");
};

const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const loadCoords = () => {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
};

const initWeather = () => {
    loadCoords();
};

initWeather();