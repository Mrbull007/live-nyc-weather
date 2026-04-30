const weatherDiv = document.getElementById('weather');

async function getWeather() {
  weatherDiv.innerHTML = '<div class="loading">Fetching latest weather...</div>';
  
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=America/New_York');
    const data = await res.json();
    
    const current = data.current;
    const code = current.weather_code;
    
    // Simple weather icons (you can replace with real emoji or images)
    const weatherIcons = {
      0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
      45: "🌫️", 48: "🌫️",
      51: "🌦️", 53: "🌦️", 55: "🌧️",
      61: "🌧️", 63: "🌧️", 65: "⛈️",
      71: "❄️", 73: "❄️", 75: "❄️",
      95: "⛈️", 96: "⛈️", 99: "⛈️"
    };
    
    const icon = weatherIcons[code] || "🌡️";
    
    weatherDiv.innerHTML = `
      <div class="weather-icon">${icon}</div>
      <div class="temp">${current.temperature_2m}°C</div>
      <div>Feels like ${current.apparent_temperature}°C</div>
      <div>Humidity: ${current.relative_humidity_2m}%</div>
      <div>Wind: ${current.wind_speed_10m} km/h</div>
      <small>Last updated: ${new Date().toLocaleTimeString()}</small>
    `;
  } catch (err) {
    weatherDiv.innerHTML = `<p style="color:red;">Error fetching weather. Try again.</p>`;
    console.error(err);
  }
}

// Load weather on page load
getWeather();
