'use client';

import React, { useState } from 'react';

export default function LocationSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/OpenWeather?searchTerm=${searchTerm}`
      );
      const data = await response.json();
      console.log('Data', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 rounded-lg"
      />
      <button
        type="submit"
        className="p-2 text-gray-700 transition-colors duration-200 transform rounded-lg hover:bg-blue-500 hover:text-white"
      ></button>
    </form>
  );
}
