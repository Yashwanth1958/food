const express = require('express');
const { createOrder, getOrder, updateOrderStatus, listOrders } = require('../controllers/orderController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/orders', auth, createOrder);
router.get('/orders/:orderId', auth, getOrder);
router.put('/orders/:orderId/status', auth, updateOrderStatus);
router.get('/orders', auth, listOrders);

module.exports = router;
