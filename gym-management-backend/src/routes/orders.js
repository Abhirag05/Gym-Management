const express = require('express');
const orderController = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Order routes
router.post('/checkout', verifyToken, orderController.checkout);
router.get('/user/:userId', verifyToken, orderController.getUserOrders);
router.get('/', verifyToken, verifyAdmin, orderController.getAllOrders);
router.put('/:id/status', verifyToken, verifyAdmin, orderController.updateOrderStatus);

module.exports = router;
