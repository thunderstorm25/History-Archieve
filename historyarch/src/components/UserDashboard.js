import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [minYear, setMinYear] = useState(1800);
  const [maxYear, setMaxYear] = useState(2040);
  const [monuments, setMonuments] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/monuments/filter-by-year', {
        params: { minYear, maxYear }
      });
      setMonuments(response.data);
    } catch (error) {
      console.error('Error fetching monuments:', error);
    }
  };

  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Monument Archive
        </Link>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Filter by Construction Year</h2>

        <div className="flex items-center mb-4 space-x-4">
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="minYear">Min Year</label>
            <input
              type="number"
              id="minYear"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className="border p-2 rounded"
              min="0"
              max="3000"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="maxYear">Max Year</label>
            <input
              type="number"
              id="maxYear"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
              className="border p-2 rounded"
              min="0"
              max="3000"
            />
          </div>
        </div>

        <button
          className="bg-blue-600 text-white p-2 rounded w-60 hover:bg-blue-700 transition duration-200"
          onClick={handleSearch}
        >
          Search
        </button>

        <div className="search-results-block mt-6">
          {monuments.length > 0 ? (
            monuments.map((monument) => (
              <div key={monument.id} className="monument-card p-4 border border-gray-300 rounded shadow-md mb-4 flex">
                <img src={monument.image_url} alt={monument.mon_name} className="w-1/4 h-auto rounded mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{monument.mon_name}</h3>
                  <p className="text-sm text-gray-600">Construction Year: {monument.construction_year}</p>
                  <p className="text-sm text-gray-600">Architect: {monument.architect}</p>
                  <p className="text-sm text-gray-600">Description: {monument.mon_description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No monuments found for the selected year range.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
