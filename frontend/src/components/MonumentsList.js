// src/components/MonumentsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonumentsList = () => {
    const [monuments, setMonuments] = useState([]);

    useEffect(() => {
        axios.get('/api/monuments')
            .then(response => setMonuments(response.data))
            .catch(error => console.error('Error fetching monuments:', error));
    }, []);

    return (
        <div>
            <h1>Monuments</h1>
            <ul>
                {monuments.map(monument => (
                    <li key={monument.id}>{monument.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MonumentsList;
