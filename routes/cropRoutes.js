const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');

// Routes for crops CRUD

// Create crop
router.post('/', cropController.createCrop);

// Get all crops
router.get('/', cropController.getCrops);

// Get crop by id
router.get('/:id', cropController.getCropById);

// Update crop
router.put('/:id', cropController.updateCrop);

// Delete crop
router.delete('/:id', cropController.deleteCrop);

module.exports = router;
