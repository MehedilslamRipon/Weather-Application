const condition = document.getElementById('condition');
const city = document.getElementById('city');
const country = document.getElementById('country');
const mainText = document.getElementById('main');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const maxTemp = document.getElementById('temp-max');
const minTemp = document.getElementById('temp-min');
const historyHeading = document.getElementById('history-heading');
const findBtn = document.getElementById('btn-find');

const cityInput = document.getElementById('city-input');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');

const API_KEY = `eee08afa3604a25e1a3151067d23181a`;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ICON_URL = `https://openweathermap.org/img/wn/`;
const DEFAULT_CITY = 'Dinajpur, BD';

window.onload = function () {
   navigator.geolocation.getCurrentPosition(
      (s) => {
         getWeatherData(null, s.coords);
      },
      (e) => {
         getWeatherData();
      }
   );

   axios
      .get('/api/history')
      .then(({ data }) => {
         if (data.length > 0) {
            updateHistory(data);
         } else {
            historyHeading.innerHTML = 'There is No History';
         }
      })
      .catch((e) => {
         console.log(e);
         alert('Error Occurred!');
      });

   cityInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
         if (e.target.value) {
            getWeatherData(e.target.value, null, (weather) => {
               e.target.value = '';
               axios
                  .port('/api/history', weather)
                  .then(({ data }) => {
                     updateHistory(data);
                  })
                  .catch((e) => {
                     console.log(e);
                     alert('Error Occurred!');
                  });
            });
         }
      }
   });
};

function getWeatherData(city = DEFAULT_CITY, coords, cb) {
   let url = BASE_URL;
   city === null
      ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`)
      : (url = `${url}&q=${city}`);

   axios
      .get(url)
      .then(({ data }) => {
         // console.log(data);
         let weather = {
            icon: data.weather[0].icon,
            name: data.name,
            country: data.sys.country,
            main: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
         };

         setWeather(weather);
         if (cb) cb(weather);
      })
      .catch((e) => {
         console.log(e);
         alert('City Not Found!');
      });
}

function setWeather(weather) {
   condition.src = `${ICON_URL}${weather.icon}.png`;
   city.innerHTML = weather.name;
   country.innerHTML = weather.country;
   mainText.innerHTML = weather.main;
   description.innerHTML = weather.description;
   temp.innerHTML = weather.temp;
   pressure.innerHTML = weather.pressure;
   humidity.innerHTML = weather.humidity;
   maxTemp.innerHTML = weather.maxTemp;
   minTemp.innerHTML = weather.minTemp;
}

function updateHistory(history) {
   (historyElm.innerHTML = ''), (history = history.reverse());

   history.forEach((h) => {
      let tempHistory = masterHistory.cloneNode(true);
      tempHistory.id = '';
      tempHistory.getElementsByClassName(
         'condition'
      )[0].src = `${ICON_URL}${h.icon}.png`;

      tempHistory.getElementsByClassName('city')[0].innerHTML = h.name;

      tempHistory.getElementsByClassName('country')[0].innerHTML = h.country;

      tempHistory.getElementsByClassName('main')[0].innerHTML = h.main;

      tempHistory.getElementsByClassName('description')[0].innerHTML =
         h.description;

      tempHistory.getElementsByClassName('temp')[0].innerHTML = h.temp;

      tempHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure;

      tempHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity;

      tempHistory.getElementsByClassName('temp-min')[0].innerHTML = h.minTemp;

      tempHistory.getElementsByClassName('temp-max')[0].innerHTML = h.maxTemp;

      historyElm.appendChild(tempHistory);
   });
}
