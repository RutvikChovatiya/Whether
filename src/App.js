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
    <div className='weather_report  align-content-center'>
    <div className="container  p-5  px-5 bg-success d-flex  justify-content-center  align-items-center flex-column">
    <div className='d-flex w-100 px-5 justify-content-center  justify-content-between'>
      <h1 className='fs-5 fw-bold text-uppercase px-5 text-white'>Weather App</h1>
      <form onSubmit={handleSubmit} className='d-flex align-content-space-between'>
        <input className='form-control col-md me-2 fw-bold mx-5' type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
        <button className="btn btn-outline-dark px-5 fs-5 fw-bold" type="submit">Get Weather</button>
      </form>
      </div>
      {weather && (
        <div className='text-center py-5 '>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main && weather.main.temp}°C</p>
          <p>Humidity: {weather.main && weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind && weather.wind.speed} m/s</p>
          <h2 className='py-5'>7-Day Forecast</h2>
          <div className='d-flex justify-content-around row row-cols-2 g-4 '>
                  {forecast.map((day, index) => (
                    <div className='col-md-1'>
                      <div key={index} className='d-flex flex-column align-items-center'>
                        <span className='fw-bold fs-5'>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' })}</span>
                        <span>{day.temp.day}°C</span>
                        <span className='text-capitalize'>{day.weather[0].description}</span>
                      </div>
                    </div>
                  ))}
                </div>
        </div>
      )}
    </div>
    </div>
  )
}
export default App;
