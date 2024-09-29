const Monument = require('../models/Monument');
const Category = require('../models/Category');
const Location = require('../models/Location');

const { Op } = require('sequelize');


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


exports.searchMonuments = async (req, res) => {
  try {
    const searchTerm = req.query.name; // Get the search term from query parameters
    const monuments = await Monument.findAll({
      where: {
        mon_name: {
          [Op.like]: `%${searchTerm}%` // Use the LIKE operator for searching
        }
      }
    });
    res.status(200).json(monuments);
  } catch (error) {
    console.error('Error searching monuments:', error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};


exports.filter = async (req, res) => {
  const { minYear, maxYear, location_id, category_id } = req.query; // Change here
  
  try {
    const monuments = await Monument.findAll({
      where: {
        construction_year: {
          [Op.between]: [minYear, maxYear]
        },
        ...(location_id && { location_id }), // Filter by location if provided
      },
      include: [
        {
          model: Category,
          ...(category_id && { where: { id: category_id } }), // Change here to filter by category ID
          attributes: ['name'],
        },
        {
          model: Location,
          attributes: ['name'],
        },
      ]
    });

    res.status(200).json(monuments);
  } catch (error) {
    console.error('Error filtering monuments:', error);
    res.status(500).json({ message: 'Error filtering monuments' });
  }
};
