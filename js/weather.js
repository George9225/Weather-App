const apiKey = '709a4b025a4d1560c7d7c2b53138e488';
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const locationEl = document.querySelector('.location');
const temperatureEl = document.querySelector('.temperature');
const dateTimeEl = document.querySelector('.date-time');

async function fetchWeather(city) {
  temperatureEl.textContent = 'Loading...';
  dateTimeEl.textContent = 'Loading time...';
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const cityName = data.name;
    const timezoneOffset = data.timezone; // in seconds

    locationEl.textContent = cityName;
    temperatureEl.textContent = `${temp}°`;

    // Calculate local time
    const localTime = getLocalTime(timezoneOffset);
    dateTimeEl.textContent = localTime;

  } catch (error) {
    alert("Error: " + error.message);
    temperatureEl.textContent = 'N/A';
    dateTimeEl.textContent = '—';
  }
}

// Convert timezone offset into readable day + time
function getLocalTime(offsetInSeconds) {
  const nowUTC = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
  const localTime = new Date(nowUTC.getTime() + offsetInSeconds * 1000);

  const options = {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  return localTime.toLocaleString('en-US', options);
}

// Handle search button
searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = searchInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});

// Load default city
fetchWeather('Batumi');
