import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationForm = () => {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState({
    name: '',
    latitude: '',
    longitude: '',
    address: ''
  });
  const [selectedLocationId, setSelectedLocationId] = useState(null); // ID for updating
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
      // If location ID is selected, update the location
      await handleUpdate(selectedLocationId);
    } else {
      // Otherwise, add a new location
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/api/locations/add', location);
      setMessage('Location added successfully!');
      resetForm();
      fetchLocations(); // Refresh location list after adding
    } catch (error) {
      setMessage('Error adding location. Please try again.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/locations/update/${id}`, location);
      if (response.status === 200) {
        setMessage('Location updated successfully!');
        resetForm();
        setSelectedLocationId(null);
        fetchLocations(); // Refresh location list after updating
      } else {
        setMessage('Error updating location. Please try again.');
      }
    } catch (error) {
      setMessage(`Error updating location: ${error.response ? error.response.data.error : error.message}`);
      console.error('Update error:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/locations/delete/${id}`);
      setMessage('Location deleted successfully!');
      fetchLocations(); // Refresh location list after deleting
    } catch (error) {
      setMessage('Error deleting location. Please try again.');
    }
  };

  const handleEditClick = (id, locationData) => {
    setSelectedLocationId(id);
    setLocation(locationData); // Set the current location data in the input fields for editing
  };

  const resetForm = () => {
    setLocation({
      name: '',
      latitude: '',
      longitude: '',
      address: ''
    });
  };

  return (
    <div>
      <h2>Manage Locations</h2>
      <form onSubmit={handleSubmit}>
        <label>Location Name</label>
        <input
          type="text"
          name="name"
          value={location.name}
          onChange={handleChange}
          required
        />
        <label>Latitude</label>
        <input
          type="number"
          name="latitude"
          value={location.latitude}
          onChange={handleChange}
          step="0.000001"
          required
        />
        <label>Longitude</label>
        <input
          type="number"
          name="longitude"
          value={location.longitude}
          onChange={handleChange}
          step="0.000001"
          required
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={location.address}
          onChange={handleChange}
        />
        <button type="submit">{selectedLocationId ? 'Update Location' : 'Add Location'}</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Locations List</h3>
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            {loc.name} ({loc.latitude}, {loc.longitude}) - {loc.address}
            <button onClick={() => handleEditClick(loc.id, loc)}>Edit</button>
            <button onClick={() => handleDelete(loc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationForm;
