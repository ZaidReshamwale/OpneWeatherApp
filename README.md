# 🌦️ OpenWeatherApp

A sleek, modern weather application that fetches real-time weather data from OpenWeatherMap based on your **current location** or a **searched city**. Built with HTML, CSS (Bootstrap), and vanilla JavaScript.

---

## 📸 Preview

### 🔹 On Load (Default - waiting for location permission):
![Default Location Request](/Images/GeoLocation.png)

### 🔹 After Searching for a City (e.g. Mexico):
![Weather for Mexico](/Images/SearchResult.png)

---

## ✨ Features

- 📍 Auto-detects **user location** and fetches local weather.
- 🌍 Supports **city name search** with dynamic weather data.
- 🌤️ **Background changes** based on weather (e.g., sunny, rainy, snow).
- ⏱️ Shows current **date, temperature, min/max**, **sunrise/sunset**, and **wind** info.
- 🧊 Toast notifications for **errors** and feedback.
- ⚡ Smooth **loading indicator** for API calls.
- ✅ Responsive UI using **Bootstrap** and **Google Fonts**.

---

## 🛠️ Installation & Usage

1. Clone the repo or [Download ZIP](#)
2. Get your **API key** from [OpenWeatherMap](https://openweathermap.org/)
3. Update `index.js`:
   ```js
   const api = {
     key: "YOUR_API_KEY",
     base: "https://api.openweathermap.org/data/2.5/"
   };
