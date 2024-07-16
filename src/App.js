import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=34480b98aa332da53123a0ac63a4ea9d`);
          setWeather(response.data);
          const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&units=metric&appid=34480b98aa332da53123a0ac63a4ea9d`);
          setForecast(forecastResponse.data.list);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main && weather.main.temp}°C</p>
          <p>Humidity: {weather.main && weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind && weather.wind.speed} m/s</p>
          <h2>7-Day Forecast</h2>
          <ul>
            {forecast.map((day, index) => (
              <li key={index}>
                <span>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' })}</span>
                <span>{day.temp && day.temp.day}°C</span>
                <span className="text-capitalize">{day.weather && day.weather[0].description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default App;
