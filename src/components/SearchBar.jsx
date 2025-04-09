import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function SearchBar({ city, setCity, fetchWeather }) {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(storedHistory);
    }, []);

    const handleSearch = (searchCity) => {
        if (!searchCity.trim()) return;

        fetchWeather(searchCity.trim());
        const updatedHistory = [searchCity.trim(), ...searchHistory.filter(c => c !== searchCity.trim())].slice(0, 5);
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    return (
        <div className="w-full flex flex-col items-center justify-center px-4 ">
            <div className="w-full max-w-lg flex items-center relative">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch(city);
                        }
                    }}
                    className="w-full bg-white/10 text-white placeholder-white/60 px-6 py-4 rounded-full backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Search city..."
                />
                <button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSearch(city)}
                    className="absolute right-2 top-2 bg-white/20 text-white p-2 rounded-full shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
            <div className="w-full max-w-lg mt-4">
                <h3 className="text-white text-sm mb-2">Recent Searches:</h3>
                <ul className="flex flex-wrap gap-2">
                    {searchHistory.map((item, index) => (
                        <li
                            key={index}
                            className="cursor-pointer rounded-xl bg-white/10 px-3 py-1 text-white/80 uppercase backdrop-blur-sm border border-white/20 hover:underline"
                            onClick={() => handleSearch(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;