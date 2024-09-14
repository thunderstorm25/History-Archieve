// src/components/AddMonument.js
import React, { useState } from 'react';
import axios from 'axios';

const AddMonument = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        location_id: '',
        construction_year: '',
        architect: '',
        image_url: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/monuments', formData)
            .then(() => alert('Monument added'))
            .catch(error => console.error('Error adding monument:', error));
    };

    return (
        <div>
            <h1>Add Monument</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                <input type="number" name="category_id" placeholder="Category ID" onChange={handleChange} required />
                <input type="number" name="location_id" placeholder="Location ID" onChange={handleChange} required />
                <input type="number" name="construction_year" placeholder="Construction Year" onChange={handleChange} required />
                <input type="text" name="architect" placeholder="Architect" onChange={handleChange} />
                <input type="text" name="image_url" placeholder="Image URL" onChange={handleChange} />
                <button type="submit">Add Monument</button>
            </form>
        </div>
    );
};

export default AddMonument;
