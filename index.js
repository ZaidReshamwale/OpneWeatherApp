const api = {
  key: "", // Add your OpenWeatherMap API key here
  base: "https://api.openweathermap.org/data/2.5/"
};

document.addEventListener("DOMContentLoaded", () => {
  createToastContainer();

  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          ({
              coords
          }) => getResultsByCoords(coords.latitude, coords.longitude),
          () => {
              showToast("Geolocation failed. Showing default location.");
              getResults("Hubli");
          }
      );
  } else {
      showToast("Geolocation not supported. Showing default location.");
      getResults("Hubli");
  }

  document.querySelector('.search-box').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
  });
});

function handleSearch() {
  const query = document.querySelector('.search-box').value.trim();
  if (query) getResults(query);
}

async function getResults(query) {
  showLoading(true);
  try {
      const res = await fetch(`${api.base}weather?q=${encodeURIComponent(query)}&units=metric&appid=${api.key}`);
      if (!res.ok) throw new Error();
      const weather = await res.json();
      displayResults(weather);
  } catch {
      showToast("City not found. Please try again.");
  } finally {
      showLoading(false);
  }
}

async function getResultsByCoords(lat, lon) {
  showLoading(true);
  try {
      const res = await fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`);
      if (!res.ok) throw new Error();
      const weather = await res.json();
      displayResults(weather);
  } catch {
      showToast("Failed to fetch weather for your location.");
  } finally {
      showLoading(false);
  }
}

function displayResults({
  name,
  sys,
  main,
  weather: [w],
  wind
}) {
  const card = document.querySelector('.weather-card');
  card.classList.add("animate__animated", "animate__fadeInUp");

  document.querySelector('.city').innerText = `${name}, ${sys.country}`;
  document.querySelector('.date').innerText = formatDate(new Date());
  document.querySelector('.temp').innerHTML = `${Math.round(main.temp)}<span>°C</span>`;
  document.querySelector('.weather').innerText = w.main;
  document.querySelector('.hi-low').innerText = `${Math.round(main.temp_min)}°C / ${Math.round(main.temp_max)}°C`;
  document.querySelector('.sunrise').innerText = `Sunrise: ${formatTime(sys.sunrise)}`;
  document.querySelector('.sunset').innerText = `Sunset: ${formatTime(sys.sunset)}`;
  document.querySelector('.wind').innerText = `Wind: ${wind.speed} m/s, ${wind.deg}°`;

  updateCardBackground(w.main.toLowerCase());
}

const formatDate = d =>
  `${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()]} 
${d.getDate()} 
${["January","February","March","April","May","June","July","August","September","October","November","December"][d.getMonth()]} 
${d.getFullYear()}`;

const formatTime = ts =>
  new Date(ts * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
  });

function updateCardBackground(condition) {
  const card = document.querySelector('.weather-card');
  const classMap = {
      sunny: 'bg-sunny',
      clear: 'bg-sunny',
      cloudy: 'bg-cloudy',
      clouds: 'bg-cloudy',
      rain: 'bg-rainy',
      drizzle: 'bg-rainy',
      snow: 'bg-snow',
      thunderstorm: 'bg-thunder'
  };

  card.className = 'weather-card text-white p-4 rounded shadow'; // reset
  card.classList.add(classMap[condition] || 'bg-primary');
}

function showLoading(show) {
  let loader = document.querySelector('.loading-spinner');
  if (!loader) {
      loader = document.createElement('div');
      loader.className = 'loading-spinner position-fixed top-50 start-50 translate-middle text-white fs-4';
      loader.innerHTML = `<div class="spinner-border text-light" role="status"></div>`;
      document.body.appendChild(loader);
  }
  loader.style.display = show ? 'block' : 'none';
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = "toast-container";
  container.className = "position-fixed top-0 end-0 p-3";
  container.style.zIndex = "1050";
  document.body.appendChild(container);
}

function showToast(message) {
  const toastId = `toast-${Date.now()}`;
  const toastHTML = `
  <div id="${toastId}" class="toast align-items-center text-bg-danger border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>`;
  document.getElementById("toast-container").insertAdjacentHTML("beforeend", toastHTML);
  const toastEl = new bootstrap.Toast(document.getElementById(toastId), {
      delay: 4000
  });
  toastEl.show();
}