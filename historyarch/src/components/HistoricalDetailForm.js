import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Assuming you have a Navbar component for consistency

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
  const [monuments, setMonuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

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

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (searchTerm.trim() === '') {
      // If search term is empty, fetch all monuments
      fetchAllMonuments();
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/api/monuments/search?name=${searchTerm}`);
      setMonuments(response.data); // Update monuments with search results
    } catch (error) {
      console.log('Error searching monuments', error);
      setMessage('Error searching for monuments. Please try again.'); // Add feedback for users
    }
  };

  const fetchAllMonuments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/monuments/all');
      setMonuments(response.data); // Update to all monuments
    } catch (error) {
      console.error('Error fetching all monuments:', error);
      setMessage('Error fetching all monuments.');
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
      <Navbar /> {/* Assuming a Navbar component for navigation */}
      <h2 className="ml-8 mt-10 text-3xl font-semibold text-blue-600 mb-4">Manage Historical Details</h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="ml-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <span className="text-lg">Monument ID</span>
              <input
                type="number"
                name="monument_id"
                value={formData.monument_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Event Name</span>
              <input
                type="text"
                name="event_name"
                value={formData.event_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Event Date</span>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Details</span>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <button
              type="submit"
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {selectedDetailId ? 'Update Historical Detail' : 'Add Historical Detail'}
            </button>
          </form>
          {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>

        {/* List Section */}
        <div className="mr-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Historical Details List</h3>
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a monument..."
              className="p-2 border border-stone-900 rounded-md"
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </form>
          <ul className="space-y-4">
            {historicalDetails.map((detail) => (
              <li key={detail.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <span className="text-lg">
                  {detail.event_name} (Date: {detail.event_date}) - {detail.details}
                </span>
                <div>
                  <button
                    onClick={() => handleEditClick(detail)}
                    className="mr-2 bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(detail.id)}
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

export default HistoricalDetailForm;
