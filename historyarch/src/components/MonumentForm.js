import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonumentForm = () => {
  const [formData, setFormData] = useState({
    mon_name: '',
    mon_description: '',
    category_id: '',
    location_id: '',
    construction_year: '',
    architect: '',
    image_url: ''
  });
  const [message, setMessage] = useState('');
  const [selectedMonumentId, setSelectedMonumentId] = useState(null); // ID for updating
  const [monuments, setMonuments] = useState([]);

  useEffect(() => {
    fetchMonuments(); // Fetch existing monuments
  }, []);

  const fetchMonuments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/monuments/all'); // Adjust this endpoint as necessary
      setMonuments(response.data);
    } catch (error) {
      console.log('Error fetching monuments', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMonumentId) {
      await handleUpdate(selectedMonumentId); // Update if ID is selected
    } else {
      await handleAdd(); // Add a new monument
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/api/monuments/add', formData);
      setMessage('Monument added successfully!');
      resetForm();
      fetchMonuments(); // Refresh list after adding
    } catch (error) {
      setMessage('Error adding monument. Please try again.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/monuments/update/${id}`, formData); // Adjust endpoint as necessary
      setMessage('Monument updated successfully!');
      resetForm();
      fetchMonuments(); // Refresh list after updating
    } catch (error) {
      setMessage('Error updating monument. Please try again.');
    }
  };

  const handleEditClick = (monument) => {
    setSelectedMonumentId(monument.id); // Set the selected monument ID
    setFormData({
      mon_name: monument.mon_name,
      mon_description: monument.mon_description,
      category_id: monument.category_id,
      location_id: monument.location_id,
      construction_year: monument.construction_year,
      architect: monument.architect,
      image_url: monument.image_url
    }); // Populate form with selected monument data
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/monuments/delete/${id}`); // Adjust endpoint as necessary
      setMessage('Monument deleted successfully!');
      fetchMonuments(); // Refresh list after deletion
    } catch (error) {
      setMessage('Error deleting monument. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      mon_name: '',
      mon_description: '',
      category_id: '',
      location_id: '',
      construction_year: '',
      architect: '',
      image_url: ''
    });
    setSelectedMonumentId(null);
  };

  return (
    <div>
      <h2>Manage Monuments</h2>
      <form onSubmit={handleSubmit}>
        <label>Monument Name</label>
        <input
          type="text"
          name="mon_name"
          value={formData.mon_name}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <textarea
          name="mon_description"
          value={formData.mon_description}
          onChange={handleChange}
          required
        />
        <label>Category ID</label>
        <input
          type="text"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        />
        <label>Location ID</label>
        <input
          type="text"
          name="location_id"
          value={formData.location_id}
          onChange={handleChange}
          required
        />
        <label>Construction Year</label>
        <input
          type="number"
          name="construction_year"
          value={formData.construction_year}
          onChange={handleChange}
        />
        <label>Architect</label>
        <input
          type="text"
          name="architect"
          value={formData.architect}
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
        <button type="submit">{selectedMonumentId ? 'Update Monument' : 'Add Monument'}</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Monuments List</h3>
      <ul>
        {monuments.map((monument) => (
          <li key={monument.id}>
            {monument.mon_name}
            <button onClick={() => handleEditClick(monument)}>Edit</button>
            <button onClick={() => handleDelete(monument.id)}>Delete</button> {/* Delete button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonumentForm;
