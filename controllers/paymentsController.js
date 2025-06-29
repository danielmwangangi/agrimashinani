const axios = require('axios');
const moment = require('moment');
const base64 = require('base-64');

/**
 * ➡️ Initiate MPESA STK Push
 */
exports.mpesaStkPush = async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: 'Phone and amount are required' });
  }

  const shortCode = process.env.MPESA_SHORTCODE;
  const passKey = process.env.MPESA_PASSKEY;
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const callbackURL = process.env.MPESA_CALLBACK_URL || `${process.env.DOMAIN_URL}/api/payments/mpesa/callback`;
  const oauthUrl = process.env.MPESA_OAUTH_URL;
  const stkUrl = process.env.MPESA_STK_URL;

  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = base64.encode(shortCode + passKey + timestamp);

  try {
    // ➡️ 1. Get access token
    const tokenResponse = await axios.get(oauthUrl, {
      auth: { username: consumerKey, password: consumerSecret }
    });

    const accessToken = tokenResponse.data.access_token;

    // ➡️ 2. Initiate STK Push
    const stkResponse = await axios.post(
      stkUrl,
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: callbackURL,
        AccountReference: 'AgriMashinani',
        TransactionDesc: 'Payment for services'
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json({
      message: 'MPESA STK Push initiated successfully',
      data: stkResponse.data
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'MPESA STK Push failed' });
  }
};

/**
 * ➡️ Initiate Paystack Payment
 */
exports.initiatePaystackPayment = async (req, res) => {
  const { amount, email } = req.body;

  if (!amount || !email) {
    return res.status(400).json({ error: 'Amount and email are required' });
  }

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { amount: amount * 100, email }, // Paystack uses kobo
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      message: 'Paystack payment initiated successfully',
      data: response.data
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Paystack payment initiation failed' });
  }
};
