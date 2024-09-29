import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [minYear, setMinYear] = useState(1400);
  const [maxYear, setMaxYear] = useState(2050);
  const [monuments, setMonuments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch monuments by default
  const fetchMonuments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/monuments/filter');
      setMonuments(response.data);
    } catch (error) {
      console.error('Error fetching monuments:', error);
    }
  };

  // Fetch locations and categories for filters
  const fetchFilters = async () => {
    try {
      const locationsResponse = await axios.get('http://localhost:3000/api/locations/all');
      const categoriesResponse = await axios.get('http://localhost:3000/api/categories/all');
      setLocations(locationsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  // Handle filter search
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/monuments/filter', {
        params: { 
          minYear, 
          maxYear, 
          location_id: selectedLocation, 
          category_id: selectedCategory 
        }
      });
      setMonuments(response.data);
    } catch (error) {
      console.error('Error fetching monuments:', error);
    }
  };

  useEffect(() => {
    fetchMonuments();
    fetchFilters();
  }, []);

  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Monument Archive
        </Link>
      </nav>

      <div className="p-6 flex">
        {/* Sidebar for filters */}
        <div className="w-1/4 pr-6">
          <h2 className="text-2xl font-semibold mb-6">Filter Monuments</h2>

          {/* Year Filters */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">By Construction Year</h3>
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
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">By Location</h3>
            <select
              className="border p-2 rounded w-full"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">By Category</h3>
            <select
              className="border p-2 rounded w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition duration-200"
            onClick={handleSearch}
          >
            Apply Filters
          </button>
        </div>

        {/* Main Content for monuments */}
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold mb-6">Monuments</h2>
          <div className="search-results-block">
            {monuments.length > 0 ? (
              monuments.map((monument) => (
                <div key={monument.id} className="monument-card p-4 border border-gray-300 rounded shadow-md mb-4 flex">
                  <img src={monument.image_url} alt={monument.mon_name} className="w-1/4 h-auto rounded mr-4" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{monument.mon_name}</h3>
                    <p className="text-sm text-gray-600">Construction Year: {monument.construction_year}</p>
                    <p className="text-sm text-gray-600">Architect: {monument.architect}</p>
                    <p className="text-sm text-gray-600">Description: {monument.mon_description}</p>
                    <p className="text-sm text-gray-600">Location: {monument.Location.name}</p>
                    <p className="text-sm text-gray-600">Category: {monument.Category.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No monuments found for the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;