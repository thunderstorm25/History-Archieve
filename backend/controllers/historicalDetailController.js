const HistoricalDetail = require('../models/HistoricalDetail');

exports.addHistoricalDetail = async (req, res) => {
  try {
    const { monument_id, event_name, event_date, details } = req.body;
    const detail = await HistoricalDetail.create({ monument_id, event_name, event_date, details });
    res.status(201).json({ message: 'Historical detail added successfully', detail });
  } catch (error) {
    console.error('Error adding historical detail:', error);
    res.status(500).json({ error: 'Failed to add historical detail' });
  }
};

exports.updateHistoricalDetail = async (req, res) => {
  try {
    const { event_name, event_date, details } = req.body;
    const [rowsUpdated, [updatedDetail]] = await HistoricalDetail.update(
      { event_name, event_date, details },
      {
        where: { id: req.params.id },
        returning: true
      }
    );
    if (rowsUpdated) {
      res.status(200).json({ message: 'Historical detail updated successfully', updatedDetail });
    } else {
      res.status(404).json({ message: 'Historical detail not found' });
    }
  } catch (error) {
    console.error('Error updating historical detail:', error);
    res.status(500).json({ error: 'Failed to update historical detail' });
  }
};

exports.deleteHistoricalDetail = async (req, res) => {
  try {
    const deletedRows = await HistoricalDetail.destroy({ where: { id: req.params.id } });
    if (deletedRows) {
      res.status(200).json({ message: 'Historical detail deleted successfully' });
    } else {
      res.status(404).json({ message: 'Historical detail not found' });
    }
  } catch (error) {
    console.error('Error deleting historical detail:', error);
    res.status(500).json({ error: 'Failed to delete historical detail' });
  }
};

exports.getHistoricalDetails = async (req, res) => {
  try {
    const details = await HistoricalDetail.findAll();
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching historical details:', error);
    res.status(500).json({ error: 'Failed to fetch historical details' });
  }
};
