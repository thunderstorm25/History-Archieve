const HistoricalDetail = require('../models/HistoricalDetail');

exports.addHistoricalDetail = async (req, res) => {
  try {
    const historicalDetail = await HistoricalDetail.create(req.body);
    res.status(201).json(historicalDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHistoricalDetail = async (req, res) => {
  try {
    const historicalDetail = await HistoricalDetail.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(historicalDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHistoricalDetail = async (req, res) => {
  try {
    await HistoricalDetail.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Historical Detail deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistoricalDetails = async (req, res) => {
  try {
    const historicalDetails = await HistoricalDetail.findAll();
    res.status(200).json(historicalDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
