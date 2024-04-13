const weatherform = document.querySelector(".weatherapp");
const cityinput = document.querySelector(".typecity");
const card = document.querySelector(".card");
const apikey = "bf5be6d7489fbe85465be53c4483a43e";

weatherform.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityinput.value;
  if (city) {
    getWeatherData(city)
      .then((weatherData) => {
        displayweatherinfo(weatherData);
      })
      .catch((error) => {
        console.error(error);
        displayerror("please enter a valid city  name");
      });
  } else {
    displayerror("Please enter a  city name");
  }
});

function getWeatherData(city) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("please enter a valid city name");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function displayweatherinfo(data) {
  // console.log(data);

  const {
    name: city,
    main: { temp, humidity },
    weather: [{ icon, description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const citydisplay = document.createElement("h1");
  const humiditydisplay = document.createElement("p");
  const tempdisplay = document.createElement("p");
  const descdisplay = document.createElement("p");
  const emoji = document.createElement("img");
  citydisplay.textContent = city;
  tempdisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
  humiditydisplay.textContent = ` humidity: ${humidity}%`;
  descdisplay.textContent = description;

  descdisplay.classList.add("descdisplay");
  humiditydisplay.classList.add("humidity");
  tempdisplay.classList.add("tempdisplay");
  citydisplay.classList.add("citydisplay");
  emoji.classList.add("weatheremoji");
  card.appendChild(citydisplay);
  card.appendChild(tempdisplay);
  card.appendChild(humiditydisplay);
  card.appendChild(descdisplay);
  card.appendChild(emoji);
  emoji.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // errordisplay.style.display = 'none'



}
function displayerror(message) {
  card.textContent = "";
  card.style.display = "flex";

  const errordisplay = document.createElement("p");
  errordisplay.textContent = message;
  errordisplay.classList.add("errordisplay");
  card.appendChild(errordisplay);
}
function defaultWeather() {
  return getWeatherData("karachi")
    .then((weatherData) => {
      displayweatherinfo(weatherData);
    })
    .catch((error) => {
      console.error(error);
      displayerror("Please enter a valid city");
      // Handle errors here
    });
}

function defaultWeatherDisplay() {
  return defaultWeather();
}

defaultWeatherDisplay();
