// controllers/locationController.js
const Location = require('../models/Location');

exports.addLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating location:', error.message); // More informative logging
    res.status(500).json({ error: error.message });
  }
};


exports.updateLocation = async (req, res) => {
  // console.log('Received request to update location with ID:', req.params.id);
  try {
    const [rowsUpdated, updatedLocations] = await Location.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });

    if (rowsUpdated) {
      const updatedLocation = updatedLocations[0];
      res.status(200).json(updatedLocation);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteLocation = async (req, res) => {
  try {
    await Location.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
