import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Assuming you also have a Navbar component for consistency

const LocationForm = () => {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState({
    name: '',
    latitude: '',
    longitude: '',
    address: ''
  });
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/locations/all');
      setLocations(response.data);
    } catch (error) {
      console.log('Error fetching locations', error);
    }
  };

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedLocationId) {
      await handleUpdate(selectedLocationId);
    } else {
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/api/locations/add', location);
      setMessage('Location added successfully!');
      resetForm();
      fetchLocations();
    } catch (error) {
      setMessage('Error adding location. Please try again.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/locations/update/${id}`, location);
      setMessage('Location updated successfully!');
      resetForm();
      setSelectedLocationId(null);
      fetchLocations();
    } catch (error) {
      setMessage(`Error updating location: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/locations/delete/${id}`);
      setMessage('Location deleted successfully!');
      fetchLocations();
    } catch (error) {
      setMessage('Error deleting location. Please try again.');
    }
  };

  const handleEditClick = (id, locationData) => {
    setSelectedLocationId(id);
    setLocation(locationData);
  };

  const resetForm = () => {
    setLocation({
      name: '',
      latitude: '',
      longitude: '',
      address: ''
    });
    setSelectedLocationId(null);
  };

  return (
    <div>
      <Navbar /> {/* Assuming the same Navbar as MonumentForm */}
      <h2 className="ml-8 mt-10 text-3xl font-semibold text-blue-600 mb-4">Manage Locations</h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="ml-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <span className="text-lg">Location Name</span>
              <input
                type="text"
                name="name"
                value={location.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Latitude</span>
              <input
                type="number"
                name="latitude"
                value={location.latitude}
                onChange={handleChange}
                step="0.000001"
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Longitude</span>
              <input
                type="number"
                name="longitude"
                value={location.longitude}
                onChange={handleChange}
                step="0.000001"
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Address</span>
              <input
                type="text"
                name="address"
                value={location.address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <button
              type="submit"
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {selectedLocationId ? 'Update Location' : 'Add Location'}
            </button>
          </form>
          {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>

        {/* List Section */}
        <div className="mr-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Locations List</h3>
          <ul className="space-y-4">
            {locations.map((loc) => (
              <li key={loc.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <span className="text-lg">
                  {loc.name} ({loc.latitude}, {loc.longitude}) - {loc.address}
                </span>
                <div>
                  <button
                    onClick={() => handleEditClick(loc.id, loc)}
                    className="mr-2 bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loc.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
