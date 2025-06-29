const express = require('express');
const router = express.Router();
const { Service } = require('../models');

// ➡️ Create service
router.post('/', async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ message: 'Service created', service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Creation failed' });
  }
});

// ➡️ Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fetching failed' });
  }
});

// ➡️ Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fetching failed' });
  }
});

// ➡️ Update service by ID
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    await service.update(req.body);
    res.json({ message: 'Service updated', service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ➡️ Delete service by ID
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
