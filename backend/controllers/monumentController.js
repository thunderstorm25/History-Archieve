// controllers/monumentController.js
const Monument = require('../models/Monument');

exports.addMonument = async (req, res) => {
  try {
    const monument = await Monument.create(req.body);
    res.status(201).json(monument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMonument = async (req, res) => {
  try {
    const [rowsUpdated, [updatedMonument]] = await Monument.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    if (rowsUpdated) {
      res.status(200).json(updatedMonument);
    } else {
      res.status(404).json({ message: 'Monument not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMonument = async (req, res) => {
  try {
    await Monument.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Monument deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMonuments = async (req, res) => {
  try {
    const monuments = await Monument.findAll();
    res.status(200).json(monuments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
