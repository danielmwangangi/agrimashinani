const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const authenticateToken = require('../middleware/authMiddleware');

// ➡️ Create Order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { itemType, itemId, quantity, totalPrice, status } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      itemType,
      itemId,
      quantity,
      totalPrice,
      status
    });
    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// ➡️ Fetch all orders (admin or future vendor use)
router.get('/', authenticateToken, async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

// ➡️ Fetch orders for logged in user
router.get('/my-orders', authenticateToken, async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.user.id } });
  res.json(orders);
});

// ➡️ Update order status (admin functionality)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();
    res.json({ message: 'Order updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ➡️ Delete order
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await order.destroy();
    res.json({ message: 'Order deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
