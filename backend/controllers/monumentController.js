const Monument = require('../models/Monument');
const { Op } = require('sequelize');
const Category = require('../models/Category');
const Location = require('../models/Location');

// Add Monument - Admin Function
exports.addMonument = async (req, res) => {
  try {
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
    console.error('Error adding monument:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update Monument - Admin Function
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
    console.error('Error updating monument:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Monument - Admin Function
exports.deleteMonument = async (req, res) => {
  try {
    const deleted = await Monument.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: 'Monument deleted successfully' });
    } else {
      res.status(404).json({ message: 'Monument not found' });
    }
  } catch (error) {
    console.error('Error deleting monument:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Monuments - User/Admin Function
exports.getMonuments = async (req, res) => {
  try {
    const monuments = await Monument.findAll({
      include: [
        { model: Category, attributes: ['name'] },
        { model: Location, attributes: ['name'] }
      ]
    });
    res.status(200).json(monuments);
  } catch (error) {
    console.error('Error fetching monuments:', error);
    res.status(500).json({ error: error.message });
  }
};

// Search Monuments by Name - User/Admin Function
exports.searchMonuments = async (req, res) => {
  try {
    const searchTerm = req.query.name || ''; // Get search term from query parameters
    const monuments = await Monument.findAll({
      where: {
        mon_name: {
          [Op.like]: `%${searchTerm}%` // Use LIKE operator for name search
        }
      },
      include: [
        { model: Category, attributes: ['name'] },
        { model: Location, attributes: ['name'] }
      ]
    });
    res.status(200).json(monuments);
  } catch (error) {
    console.error('Error searching monuments:', error);
    res.status(500).json({ error: error.message });
  }
};

// Filter Monuments by Construction Year, Location, and Category
exports.filter = async (req, res) => {
  try {
    const { minYear, maxYear, location_id, category_id } = req.query;

    // Build a query object dynamically
    const whereConditions = {};

    // Filter by construction year range
    if (minYear && maxYear) {
      whereConditions.construction_year = {
        [Op.between]: [minYear, maxYear]
      };
    } else if (minYear) {
      whereConditions.construction_year = { [Op.gte]: minYear };
    } else if (maxYear) {
      whereConditions.construction_year = { [Op.lte]: maxYear };
    }

    // Filter by location ID, if provided
    if (location_id) {
      whereConditions.location_id = location_id;
    }

    // Execute the query, joining Category and Location models
    const monuments = await Monument.findAll({
      where: whereConditions,
      include: [
        {
          model: Category,
          ...(category_id && { where: { id: category_id } }), // Filter by category ID if provided
          attributes: ['name'],
        },
        {
          model: Location,
          attributes: ['name'],
        },
      ],
    });

    // Return results
    res.status(200).json(monuments);
  } catch (error) {
    console.error('Error filtering monuments:', error);
    res.status(500).json({ message: 'Error filtering monuments' });
  }
<<<<<<< Updated upstream

  exports.filterMonuments = async (req, res) => {
    try {
      const { minYear, maxYear, location_id, category_id } = req.query;
      const filterCriteria = {};
  
      if (minYear && maxYear) {
        filterCriteria.construction_year = {
          [Op.between]: [minYear, maxYear]
        };
      }
  
      if (location_id) {
        filterCriteria.location_id = location_id;
      }
  
      if (category_id) {
        filterCriteria.category_id = category_id;
      }
  
      const monuments = await Monument.findAll({
        where: filterCriteria,
        include: [
          { model: Category, attributes: ['name'] },
          { model: Location, attributes: ['name'] }
        ]
      });
      res.status(200).json(monuments);
    } catch (error) {
      console.error('Error filtering monuments:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
};
=======
};
>>>>>>> Stashed changes
