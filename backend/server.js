// server.js
const express = require('express');
const app = express();
const port = 5000;
const db = require('./db');

// Middleware
app.use(express.json());

// Routes
app.get('/api/monuments', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Monuments');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch monuments' });
    }
});

app.post('/api/monuments', async (req, res) => {
    const { name, description, category_id, location_id, construction_year, architect, image_url } = req.body;
    try {
        await db.query(
            'INSERT INTO Monuments (name, description, category_id, location_id, construction_year, architect, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, category_id, location_id, construction_year, architect, image_url]
        );
        res.status(201).json({ message: 'Monument added' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add monument' });
    }
});

app.put('/api/monuments/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, category_id, location_id, construction_year, architect, image_url } = req.body;
    try {
        await db.query(
            'UPDATE Monuments SET name = ?, description = ?, category_id = ?, location_id = ?, construction_year = ?, architect = ?, image_url = ? WHERE id = ?',
            [name, description, category_id, location_id, construction_year, architect, image_url, id]
        );
        res.json({ message: 'Monument updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update monument' });
    }
});

app.delete('/api/monuments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Monuments WHERE id = ?', [id]);
        res.json({ message: 'Monument deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete monument' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
