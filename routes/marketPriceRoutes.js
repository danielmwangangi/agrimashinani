const express = require('express');
const router = express.Router();
const { MarketPrice } = require('../models');
const authenticateToken = require('../middleware/authMiddleware');

// ➡️ Create
router.post('/', authenticateToken, async (req, res) => {
  const { itemName, category, marketPrice } = req.body;
  const price = await MarketPrice.create({ itemName, category, marketPrice });
  res.status(201).json({ message: 'Market price added', price });
});

// ➡️ Get all
router.get('/', authenticateToken, async (req, res) => {
  const prices = await MarketPrice.findAll();
  res.json(prices);
});

// ➡️ Update
router.put('/:id', authenticateToken, async (req, res) => {
  const price = await MarketPrice.findByPk(req.params.id);
  if (!price) return res.status(404).json({ error: 'Not found' });

  price.itemName = req.body.itemName || price.itemName;
  price.category = req.body.category || price.category;
  price.marketPrice = req.body.marketPrice || price.marketPrice;

  await price.save();
  res.json({ message: 'Updated', price });
});

// ➡️ Delete
router.delete('/:id', authenticateToken, async (req, res) => {
  const price = await MarketPrice.findByPk(req.params.id);
  if (!price) return res.status(404).json({ error: 'Not found' });

  await price.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
