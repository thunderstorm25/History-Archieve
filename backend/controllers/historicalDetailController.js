// controllers/historicalDetailController.js
const HistoricalDetail = require('../models/HistoricalDetail');

exports.addHistoricalDetail = async (req, res) => {
  try {
    const detail = await HistoricalDetail.create(req.body);
    res.status(201).json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHistoricalDetail = async (req, res) => {
  try {
    const [rowsUpdated, [updatedDetail]] = await HistoricalDetail.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    if (rowsUpdated) {
      res.status(200).json(updatedDetail);
    } else {
      res.status(404).json({ message: 'Historical detail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHistoricalDetail = async (req, res) => {
  try {
    await HistoricalDetail.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Historical detail deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistoricalDetails = async (req, res) => {
  try {
    const details = await HistoricalDetail.findAll();
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
