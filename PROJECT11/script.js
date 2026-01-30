const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const errorEl = document.getElementById("error");
const recentList = document.getElementById("recentList");

document.getElementById("searchBtn").onclick = () => {
    const city = cityInput.value.trim();
    if (city) getCity(city);
};

function getCity(city) {
    errorEl.textContent = "";
    loading.classList.remove("hidden");
    weatherCard.classList.add("hidden");

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        .then(res => res.json())
        .then(data => {
            if (!data.results) throw "City not found";
            const c = data.results[0];
            getWeather(c.latitude, c.longitude, c.name, c.country);
        })
        .catch(err => showError(err));
}

function getWeather(lat, lon, city, country) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            showWeather(data.current_weather, city, country, lat, lon);
            saveCity(city);
            showRecent();
        })
        .catch(() => showError("Weather not available"))
        .finally(() => loading.classList.add("hidden"));
}

function showWeather(w, city, country, lat, lon) {
    weatherCard.innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>Location: ${lat.toFixed(2)}, ${lon.toFixed(2)}</p>
        <p>Temperature: ${w.temperature} °C</p>
        <p>Wind: ${w.windspeed} km/h</p>
    `;
    weatherCard.classList.remove("hidden");
}

function saveCity(city) {
    let list = JSON.parse(localStorage.getItem("recent")) || [];
    if (!list.includes(city)) {
        list.unshift(city);
        localStorage.setItem("recent", JSON.stringify(list.slice(0, 5)));
    }
}

function showRecent() {
    recentList.innerHTML = "";
    (JSON.parse(localStorage.getItem("recent")) || []).forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.onclick = () => getCity(city);
        recentList.appendChild(li);
    });
}

function showError(msg) {
    errorEl.textContent = msg;
    loading.classList.add("hidden");
}

showRecent();
