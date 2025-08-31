const express = require('express');
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Cart routes
router.post('/', verifyToken, cartController.addToCart);
router.get('/:userId', verifyToken, cartController.getCart);
router.delete('/:userId/:itemId', verifyToken, cartController.removeFromCart);
router.delete('/:userId', verifyToken, cartController.clearCart);

module.exports = router;
