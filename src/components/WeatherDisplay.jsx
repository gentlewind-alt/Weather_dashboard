import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cloud, Wind, Moon, CloudRain } from 'lucide-react';

function WeatherDisplay({ weather, loading, error, forecast }) {
    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const getWeatherIcon = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 flex flex-col md:flex-row gap-2 items-start justify-between">
            <div className="w-full md:w-1/2">
                {forecast && forecast.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 p-4">
                        {forecast.map((day, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/20 text-white"
                            >
                                <p className="text-sm text-white/80">{new Date(day.dt * 1000).toLocaleDateString()}</p>
                                <div className="my-2">
                                    <img
                                        src={getWeatherIcon(day.weather[0].icon)}
                                        alt={day.weather[0].description}
                                        className="w-16 h-16"
                                    />
                                </div>
                                <p className="text-lg">{Math.round(day.main.temp)}°</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full md:w-1/2 max-w-sm rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center flex-1"
                        >
                            <motion.div animate={floatingAnimation}>
                                <Cloud className="w-16 h-8 mx-auto text-white/80" />
                            </motion.div>
                            <p className="mt-4 text-lg text-white/80">Searching...</p>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-white/80 text-center bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 flex-1"
                        >
                            {error}
                        </motion.div>
                    )}

                    {weather && !loading && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-6 w-full"
                        >
                            <motion.div animate={floatingAnimation} className="text-white">
                                <img
                                    src={getWeatherIcon(weather.weather[0].icon)}
                                    alt={weather.weather[0].description}
                                    className="w-16 h-16"
                                />
                            </motion.div>
                            <div className="flex-1">
                                <h2 className="text-5xl font-light text-white mb-2">
                                    {Math.round(weather.main.temp)}°
                                </h2>
                                <p className="text-white/80 text-xl">{weather.name}</p>
                                <p className="text-white/60 text-lg capitalize">{weather.weather[0].description}</p>
                            </div>
                            <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                                <div className="flex items-center gap-2 text-white/80">
                                    <Wind className="w-5 h-5" />
                                    <span>{weather.wind.speed} km/h</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/80"> 
                                    <Cloud className="w-5 h-5" />
                                    <span>{weather.main.humidity}%</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default WeatherDisplay;