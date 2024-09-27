import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import your Navbar component

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
  const [selectedMonumentId, setSelectedMonumentId] = useState(null);
  const [monuments, setMonuments] = useState([]);

  useEffect(() => {
    fetchMonuments();
  }, []);

  const fetchMonuments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/monuments/all');
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
      await handleUpdate(selectedMonumentId);
    } else {
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/api/monuments/add', formData);
      setMessage('Monument added successfully!');
      resetForm();
      fetchMonuments();
    } catch (error) {
      setMessage('Error adding monument. Please try again.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/monuments/update/${id}`, formData);
      setMessage('Monument updated successfully!');
      resetForm();
      fetchMonuments();
    } catch (error) {
      setMessage('Error updating monument. Please try again.');
    }
  };

  const handleEditClick = (monument) => {
    setSelectedMonumentId(monument.id);
    setFormData({
      mon_name: monument.mon_name,
      mon_description: monument.mon_description,
      category_id: monument.category_id,
      location_id: monument.location_id,
      construction_year: monument.construction_year,
      architect: monument.architect,
      image_url: monument.image_url
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/monuments/delete/${id}`);
      setMessage('Monument deleted successfully!');
      fetchMonuments();
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
      <Navbar /> {/* Render the Navbar component */}
      <h2 className="ml-8 mt-10 text-3xl font-semibold text-blue-600 mb-4">Manage Monuments</h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="ml-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <span className="text-lg">Monument Name</span>
              <input
                type="text"
                name="mon_name"
                value={formData.mon_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Construction Year</span>
              <input
                type="number"
                name="construction_year"
                value={formData.construction_year}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Category ID</span>
              <input
                type="text"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Location ID</span>
              <input
                type="text"
                name="location_id"
                value={formData.location_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Architect</span>
              <input
                type="text"
                name="architect"
                value={formData.architect}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Image URL</span>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <label className="block mb-2">
              <span className="text-lg">Description</span>
              <textarea
                name="mon_description"
                value={formData.mon_description}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>

            <button
              type="submit"
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {selectedMonumentId ? 'Update Monument' : 'Add Monument'}
            </button>
          </form>
          {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>

        {/* List Section */}
        <div className="mr-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Monuments List</h3>
          <ul className="space-y-4">
            {monuments.map((monument) => (
              <li key={monument.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <span className="text-lg">{monument.mon_name}</span>
                <div>
                  <button
                    onClick={() => handleEditClick(monument)}
                    className="mr-2 bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(monument.id)}
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

export default MonumentForm;
