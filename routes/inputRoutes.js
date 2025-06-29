const express = require('express');
const router = express.Router();
const { Input } = require('../models');

// ➡️ Create input
router.post('/', async (req, res) => {
  try {
    const input = await Input.create(req.body);
    res.status(201).json({ message: 'Input created', input });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Creation failed' });
  }
});

// ➡️ Get all inputs
router.get('/', async (req, res) => {
  try {
    const inputs = await Input.findAll();
    res.json(inputs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fetching failed' });
  }
});

// ➡️ Get input by ID
router.get('/:id', async (req, res) => {
  try {
    const input = await Input.findByPk(req.params.id);
    if (!input) return res.status(404).json({ error: 'Input not found' });
    res.json(input);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fetching failed' });
  }
});

// ➡️ Update input by ID
router.put('/:id', async (req, res) => {
  try {
    const input = await Input.findByPk(req.params.id);
    if (!input) return res.status(404).json({ error: 'Input not found' });
    await input.update(req.body);
    res.json({ message: 'Input updated', input });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ➡️ Delete input by ID
router.delete('/:id', async (req, res) => {
  try {
    const input = await Input.findByPk(req.params.id);
    if (!input) return res.status(404).json({ error: 'Input not found' });
    await input.destroy();
    res.json({ message: 'Input deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
