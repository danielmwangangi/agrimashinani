const express = require('express');
const router = express.Router();
const { Livestock } = require('../models');

// Create livestock
router.post('/', async (req, res) => {
  try {
    const livestock = await Livestock.create(req.body);
    res.status(201).json({ message: 'Livestock created', livestock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Creation failed' });
  }
});

// Get all livestock
router.get('/', async (req, res) => {
  try {
    const livestock = await Livestock.findAll();
    res.json(livestock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fetching failed' });
  }
});

// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const livestock = await Livestock.findByPk(req.params.id);
    if (!livestock) return res.status(404).json({ error: 'Not found' });
    res.json(livestock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fetching failed' });
  }
});

// Update by ID
router.put('/:id', async (req, res) => {
  try {
    const livestock = await Livestock.findByPk(req.params.id);
    if (!livestock) return res.status(404).json({ error: 'Not found' });
    await livestock.update(req.body);
    res.json({ message: 'Updated', livestock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete by ID
router.delete('/:id', async (req, res) => {
  try {
    const livestock = await Livestock.findByPk(req.params.id);
    if (!livestock) return res.status(404).json({ error: 'Not found' });
    await livestock.destroy();
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
