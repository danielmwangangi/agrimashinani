const { Crop } = require('../models');

// Create a new crop
exports.createCrop = async (req, res) => {
  const { name, variety, description, category, image_url } = req.body;

  try {
    const crop = await Crop.create({
      name,
      variety,
      description,
      category,
      image_url
    });
    res.status(201).json({ message: 'Crop created', crop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create crop' });
  }
};

// Get all crops
exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.findAll();
    res.json(crops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
};

// Get a crop by id
exports.getCropById = async (req, res) => {
  const { id } = req.params;

  try {
    const crop = await Crop.findByPk(id);

    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    res.json(crop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch crop' });
  }
};

// Update a crop
exports.updateCrop = async (req, res) => {
  const { id } = req.params;
  const { name, variety, description, category, image_url } = req.body;

  try {
    const crop = await Crop.findByPk(id);

    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    await crop.update({
      name,
      variety,
      description,
      category,
      image_url
    });

    res.json({ message: 'Crop updated', crop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update crop' });
  }
};

// Delete a crop
exports.deleteCrop = async (req, res) => {
  const { id } = req.params;

  try {
    const crop = await Crop.findByPk(id);

    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    await crop.destroy();
    res.json({ message: 'Crop deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete crop' });
  }
};
