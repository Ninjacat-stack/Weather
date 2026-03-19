const API_KEY = "6d89973f1a6649f1877144317261803";
const searchBar = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

const city = document.querySelector(".city");
const temp = document.querySelector(".temperature h1");
const humidity = document.querySelector(".humidity-val");
const wind = document.querySelector(".wind-val");
const icon = document.querySelector(".icon")
const iconName = document.querySelector('.iconName')

//Fetch the response

const fetchData = async (cityName) => {
    try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`,
    );

    const data = await res.json();

    if(data.error) {
      searchBar.value = 'Enter a valid city'
      return;
    }

    city.textContent = `${data.location.name}, ${data.location.country}`;
    temp.textContent = `${data.current.temp_c}°C`;
    humidity.textContent = `${data.current.humidity}%`;
    wind.textContent = `${data.current.wind_kph} km/h`;
    icon.src = `${data.current.condition.icon}`
    iconName.textContent = `${data.current.condition.text}`

  } catch (err) {
    console.log(err);
  }
};

//Search bar dynamic

searchBtn.addEventListener("click", () => {
  if (searchBar.value == "") return;
  const cityName = searchBar.value;

  fetchData(cityName);
  searchBar.value = ''
});

searchBar.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (searchBar.value == "") return;
    const cityName = searchBar.value;

    fetchData(cityName);
    searchBar.value = ''
  }
});

//Fetch Current date

const date = new Date();
const currDate = document.querySelector(".date");

currDate.textContent = date.toDateString();


// auto detect location

const getLocationWeather = () => {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
      );

      const data = await res.json();

      console.log(data);

      // update UI
      city.textContent = `${data.location.name}, ${data.location.country}`;
      temp.textContent = `${data.current.temp_c}°C`;

    } catch (err) {
      console.log(err);
    }
  });
};

getLocationWeather()