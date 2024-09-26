import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoricalDetailForm = () => {
  const [formData, setFormData] = useState({
    monument_id: '',
    event_name: '',
    event_date: '',
    details: '',
  });
  const [message, setMessage] = useState('');
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [historicalDetails, setHistoricalDetails] = useState([]);

  useEffect(() => {
    fetchHistoricalDetails();
  }, []);

  const fetchHistoricalDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/historical-details/all');
      setHistoricalDetails(response.data);
    } catch (error) {
      console.error('Error fetching historical details:', error);
      setMessage('Error fetching historical details.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDetailId) {
      await handleUpdate(selectedDetailId);
    } else {
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/api/historical-details/add', formData);
      setMessage('Historical detail added successfully!');
      resetForm();
      fetchHistoricalDetails();
    } catch (error) {
      setMessage('Error adding historical detail. Please try again.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/historical-details/update/${id}`, formData);
      setMessage('Historical detail updated successfully!');
      resetForm();
      fetchHistoricalDetails();
    } catch (error) {
      setMessage('Error updating historical detail. Please try again.');
    }
  };

  const handleEditClick = (detail) => {
    setSelectedDetailId(detail.id);
    setFormData({
      monument_id: detail.monument_id,
      event_name: detail.event_name,
      event_date: detail.event_date,
      details: detail.details,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/historical-details/delete/${id}`);
      setMessage('Historical detail deleted successfully!');
      fetchHistoricalDetails();
    } catch (error) {
      setMessage('Error deleting historical detail. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      monument_id: '',
      event_name: '',
      event_date: '',
      details: '',
    });
    setSelectedDetailId(null);
  };

  return (
    <div>
      <h2>Manage Historical Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Monument ID</label>
        <input
          type="number"
          name="monument_id"
          value={formData.monument_id}
          onChange={handleChange}
          required
        />
        <label>Event Name</label>
        <input
          type="text"
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          required
        />
        <label>Event Date</label>
        <input
          type="date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          required
        />
        <label>Details</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          required
        />
        <button type="submit">{selectedDetailId ? 'Update Historical Detail' : 'Add Historical Detail'}</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Historical Details List</h3>
      <ul>
        {historicalDetails.map((detail) => (
          <li key={detail.id}>
            {detail.event_name} (Date: {detail.event_date})
            <button onClick={() => handleEditClick(detail)}>Edit</button>
            <button onClick={() => handleDelete(detail.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoricalDetailForm;
