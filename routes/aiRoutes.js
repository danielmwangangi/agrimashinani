// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { getAdvisory } = require('../controllers/aiController');
const authenticateToken = require('../middleware/authMiddleware');

// ➡️ POST /api/ai/advisory
router.post('/advisory', authenticateToken, getAdvisory);

module.exports = router;
