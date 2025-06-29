const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI();

router.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert Kenyan agricultural advisor." },
        { role: "user", content: question },
      ],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI advisory failed' });
  }
});

module.exports = router;
