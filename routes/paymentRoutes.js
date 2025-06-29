const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

/**
 * ➡️ Paystack payment initiation route
 */
router.post('/paystack/initiate', paymentsController.initiatePaystackPayment);

/**
 * ➡️ MPESA STK Push route
 */
router.post('/mpesa/stkpush', paymentsController.mpesaStkPush);

module.exports = router;
