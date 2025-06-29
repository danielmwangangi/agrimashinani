// controllers/aiController.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: promptTemplate,
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({ advisory: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI advisory' });
  }
};
