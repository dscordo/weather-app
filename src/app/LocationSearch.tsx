'use client';

import React, { useState } from 'react';
import DisplayWeather from './DisplayWeather';

export default function LocationSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/OpenWeather?searchTerm=${searchTerm}`
      );
      const data = await response.json();
      setWeatherData(data);
      setSearchTerm('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="m-1 p-1">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pb-6 pointer-events-none">
              <i className="bi bi-search w-5 h-5 text-gray-500 dark:text-gray-400"></i>
            </div>
            <input
              type="search"
              placeholder="Search for a city"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block p-4 pl-10 w-64 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="submit"
              className="text-gray-700 transition-colors duration-200 transform rounded-lg hover:bg-blue-500 hover:text-white"
            ></button>
          </div>
        </form>
      </div>
      {weatherData && (
        <div className="w-full">
          <DisplayWeather weatherData={weatherData} />
        </div>
      )}
    </div>
  );
}
