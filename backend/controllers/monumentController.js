const Monument = require('../models/Monument');

exports.addMonument = async (req, res) => {
  try {
    // Map the request body to match the model's field names
    const { mon_name, mon_description, category_id, location_id, construction_year, architect, image_url } = req.body;

    const monument = await Monument.create({
      mon_name,
      mon_description,
      category_id,
      location_id,
      construction_year,
      architect,
      image_url
    });

    res.status(201).json(monument);
  } catch (error) {
    console.error('Error adding monument:', error); // Log error for debugging
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
    console.error('Error updating monument:', error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMonument = async (req, res) => {
  try {
    await Monument.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Monument deleted' });
  } catch (error) {
    console.error('Error deleting monument:', error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};

exports.getMonuments = async (req, res) => {
  try {
    const monuments = await Monument.findAll();
    res.status(200).json(monuments);
  } catch (error) {
    console.error('Error fetching monuments:', error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};
