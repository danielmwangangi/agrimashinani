const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');
const livestockRoutes = require('./routes/livestockRoutes');
const inputRoutes = require('./routes/inputRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const orderRoutes = require('./routes/orderRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const marketPriceRoutes = require('./routes/marketPriceRoutes');
const ussdRoutes = require('./routes/ussdRoutes');
const advisoryRoutes = require('./routes/advisoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const aiRoutes = require('./routes/aiRoutes'); // ✅ Added AI advisory route

const app = express();

app.use(cors());
app.use(express.json());

// ➡️ API Route mounts
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/livestock', livestockRoutes);
app.use('/api/inputs', inputRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/market-prices', marketPriceRoutes);
app.use('/api/ussd', ussdRoutes);
app.use('/api/advisory', advisoryRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes); // ✅ AI route mount

// ➡️ Health check endpoint
app.get('/', (req, res) => {
  res.send('Agri-mashinani backend running');
});

// ➡️ Scheduled weather SMS job (6 AM daily)
cron.schedule('0 6 * * *', () => {
  console.log('⏰ Sending daily weather SMS to users at 6 AM...');
  // TODO: integrate with weather + SMS module
});

// ➡️ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
