import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Cloud } from 'lucide-react';

const ForecastCard = ({ day }) => {
    const date = new Date(day.dt * 1000).toLocaleDateString();
    const { icon, description } = day.weather[0];
    const temp = Math.round(day.main.temp);

    return (
        <div className="flex flex-col items-center bg-white/10 p-3 rounded-xl border border-white/20 text-white">
            <p className="text-sm text-white/70">{date}</p>
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                className="w-14 h-14 my-2"
            />
            <p className="text-lg">{temp}°</p>
        </div>
    );
};

const WeatherInfo = ({ weather }) => {
    const { icon, description } = weather.weather[0];
    const temp = Math.round(weather.main.temp);
    const city = weather.name;
    const wind = weather.wind.speed;
    const humidity = weather.main.humidity;

    const floatAnim = {
        y: [0, -8, 0],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex gap-6 items-center w-full"
        >
            <motion.div animate={floatAnim}>
                <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={description}
                    className="w-16 h-16"
                />
            </motion.div>
            <div className="flex-1">
                <h2 className="text-5xl text-white font-light mb-1">{temp}°</h2>
                <p className="text-xl text-white/80">{city}</p>
                <p className="capitalize text-lg text-white/60">{description}</p>
            </div>
            <div className="flex flex-col gap-3 bg-white/10 p-4 rounded-xl border border-white/20 text-white/80">
                <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5" />
                    <span>{wind} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    <span>{humidity}%</span>
                </div>
            </div>
        </motion.div>
    );
};

function WeatherDisplay({ weather, loading, error, forecast }) {
    return (
        <div className="max-w-4xl mx-auto mt-10 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
                {forecast?.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                        {forecast.map((day, i) => (
                            <ForecastCard key={i} day={day} />
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full md:w-1/2 max-w-sm p-6 rounded-lg bg-white/5 border border-white/10 shadow-md">
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <motion.div animate={{ y: [0, -6, 0], transition: { repeat: Infinity, duration: 1.8 } }}>
                                <Cloud className="w-12 h-12 mx-auto text-white/60" />
                            </motion.div>
                            <p className="mt-3 text-white/70">Fetching weather...</p>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-4 text-white/80 bg-red-500/10 border border-red-400/20 rounded-xl"
                        >
                            {error}
                        </motion.div>
                    )}

                    {weather && !loading && (
                        <WeatherInfo weather={weather} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default WeatherDisplay;
