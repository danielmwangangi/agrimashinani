// routes/ussdRoutes.js

const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
  const { text, phoneNumber } = req.body;

  let response = '';
  const textArray = text.split('*');
  const userInput = textArray[textArray.length - 1];

  if (text === '') {
    response = `CON Welcome to AgriMashinani
1. Register
2. Advisory
3. Weather`;
  } else if (textArray[0] === '1') {
    // Registration flow
    if (textArray.length === 1) {
      response = 'CON Please enter your full name:';
    } else if (textArray.length === 2) {
      const name = userInput;
      try {
        await User.create({ name, phone: phoneNumber, role: 'farmer' });
        response = `END Thank you ${name}, you have been registered successfully.`;
      } catch (error) {
        console.error(error);
        response = 'END Registration failed. Please try again later.';
      }
    } else {
      response = 'END Invalid registration input.';
    }

  } else if (textArray[0] === '2') {
    // Advisory flow (MVP static response for now)
    if (textArray.length === 1) {
      response = 'CON Enter your farming advisory query:';
    } else if (textArray.length === 2) {
      const query = userInput;
      // Future: integrate OpenAI here to return live advisory
      response = `END Advisory: For "${query}", ensure good spacing, timely weeding, and proper fertiliser application.`;
    } else {
      response = 'END Invalid advisory input.';
    }

  } else if (textArray[0] === '3') {
    // Weather flow (MVP static response for now)
    response = 'END Today is partly cloudy with highs of 26°C and lows of 15°C.';
  } else {
    response = 'END Invalid option.';
  }

  res.set('Content-Type: text/plain');
  res.send(response);
});

module.exports = router;
