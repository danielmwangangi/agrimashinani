// controllers/aiController.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getAdvisory = async (req, res) => {
  const { query, category } = req.body;

  if (!query || !category) {
    return res.status(400).json({ error: 'Query and category are required' });
  }

  let promptTemplate = '';

  if (category === 'crop') {
    promptTemplate = `You are an expert crop agronomist in Kenya. Provide detailed practical advisory for the following query: "${query}". Include best practices, localised recommendations, and potential risks.`;
  } else if (category === 'livestock') {
    promptTemplate = `You are an experienced livestock veterinarian and farmer in Kenya. Provide clear advisory for: "${query}". Cover disease prevention, feeding, and daily management tips.`;
  } else if (category === 'farm_inputs') {
    promptTemplate = `You are an agro-inputs specialist. Advise a Kenyan farmer on the best farm inputs for: "${query}". Include product types, recommended brands, and application instructions.`;
  } else {
    promptTemplate = `You are an agriculture advisory AI. Answer the following general query comprehensively: "${query}".`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful agricultural advisory assistant.' },
        { role: 'user', content: promptTemplate },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({ advisory: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI advisory' });
  }
};
