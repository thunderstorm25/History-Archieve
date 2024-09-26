import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit}>
        <label>Category Name</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">{selectedCategoryId ? 'Update Category' : 'Add Category'}</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Categories List</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name} 
            <button onClick={() => handleEditClick(cat.id, cat.name)}>Edit</button>
            <button onClick={() => handleDelete(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryForm;
