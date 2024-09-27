import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import your Navbar component

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // ID for updating
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories/all');
      setCategories(response.data);
    } catch (error) {
      console.log('Error fetching categories', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCategoryId) {
      // If category ID is selected, update the category
      await handleUpdate(selectedCategoryId);
    } else {
      // Otherwise, add a new category
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/api/categories/add', { name: category });
      setMessage('Category added successfully!');
      setCategory('');
      fetchCategories(); // Refresh category list after adding
    } catch (error) {
      setMessage('Error adding category. Please try again.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/categories/update/${id}`, { name: category });
      setMessage('Category updated successfully!');
      setCategory('');
      setSelectedCategoryId(null);
      fetchCategories(); // Refresh category list after updating
    } catch (error) {
      setMessage('Error updating category. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/delete/${id}`);
      setMessage('Category deleted successfully!');
      fetchCategories(); // Refresh category list after deleting
    } catch (error) {
      setMessage('Error deleting category. Please try again.');
    }
  };

  const handleEditClick = (id, name) => {
    setSelectedCategoryId(id);
    setCategory(name); // Set the current name in the input field for editing
  };

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <h2 className="ml-8 mt-10 text-3xl font-semibold text-blue-600 mb-4">Manage Categories</h2>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"> 
        {/* Form Section */}
        <div className="ml-10 bg-blue-100 p-6 rounded-lg shadow-md">
          
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <span className="text-lg">Category Name</span>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-stone-900 rounded-md transition duration-300"
              />
            </label>
            <button
              type="submit"
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {selectedCategoryId ? 'Update Category' : 'Add Category'}
            </button>
          </form>
          {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>

        {/* List Section */}
        <div className="mr-10 bg-blue-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Categories List</h3>
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <span className="text-lg">{cat.name}</span>
                <div>
                  <button
                    onClick={() => handleEditClick(cat.id, cat.name)}
                    className="mr-2 bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
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

export default CategoryForm;
