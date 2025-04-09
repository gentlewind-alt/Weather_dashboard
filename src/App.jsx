import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // Added state for forecast
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    // Load search history from localStorage on component mount
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError('');
      // Fetch current weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherResponse.data);

      // Fetch 5-day forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const dailyForecast = forecastResponse.data.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(dailyForecast);

      // Update search history
      const newHistory = [cityName, ...history.filter(item => item !== cityName)].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (err) {
      setError('City not found or API error');
      setWeather(null);
      setForecast(null); // Reset forecast on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-purple-950 via-violet-900 to-purple-950' 
        : 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500'
    }`}>
      {/* Header Component */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Search Bar */}
      <div className='relative justify-center items-center mt-10'>
        <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      </div>
      
      {/* Weather Display */}
      <WeatherDisplay 
        weather={weather} 
        loading={loading} 
        error={error} 
        darkMode={darkMode} 
        forecast={forecast} // Pass forecast data
      />
    </div>
  );
}

export default App;