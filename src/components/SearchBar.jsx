import React, { useState, useEffect } from 'react';

function SearchBar({ city, setCity, fetchWeather }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setHistory(stored);
    }, []);

    const handleSearch = (input) => {
        const trimmed = input.trim();
        if (!trimmed) return;

        fetchWeather(trimmed);

        const updated = [trimmed, ...history.filter(item => item !== trimmed)].slice(0, 5);
        setHistory(updated);
        localStorage.setItem('searchHistory', JSON.stringify(updated));
    };

    return (
        <div className="w-full px-4 flex flex-col items-center">
            <div className="w-full max-w-lg relative flex items-center">
                <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(city)}
                    className="w-full px-6 py-4 rounded-full text-white bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Search city..."
                />
                <button
                    onClick={() => handleSearch(city)}
                    className="absolute right-2 top-2 bg-white/20 text-white p-2 rounded-full shadow"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            {history.length > 0 && (
                <div className="w-full max-w-lg mt-4">
                    <h3 className="text-sm text-white mb-2">Recent Searches</h3>
                    <ul className="flex flex-wrap gap-2">
                        {history.map((item, i) => (
                            <li
                                key={i}
                                onClick={() => handleSearch(item)}
                                className="cursor-pointer px-3 py-1 rounded-xl uppercase bg-white/10 text-white/80 border border-white/20 hover:underline"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchBar;