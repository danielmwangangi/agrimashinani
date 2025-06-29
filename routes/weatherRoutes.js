const express = require('express');
const axios = require('axios');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/:county', authenticateToken, async (req, res) => {
  const county = req.params.county;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${county},KE&units=metric&appid=${apiKey}`
    );

    res.json({
      location: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description
    });
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

module.exports = router;
