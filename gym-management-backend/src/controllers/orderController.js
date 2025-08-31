const Order = require('../models/Order');
const Cart = require('../models/Cart');

const orderController = {
  // Create order from cart (checkout)
  checkout: async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      // Get cart with populated products
      const cart = await Cart.findOne({ userId })
        .populate({
          path: 'items.productId',
          match: { _id: { $ne: null } }
        });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Filter out any items where product is null
      const validItems = cart.items.filter(item => item.productId);

      if (validItems.length === 0) {
        return res.status(400).json({ message: 'No valid items in cart' });
      }

      // Prepare order items
      const orderItems = validItems.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        imageUrl: item.productId.imageUrl
      }));

      // Calculate total
      const total = validItems.reduce((sum, item) => 
        sum + (item.productId.price * item.quantity), 0);

      // Create order
      const order = new Order({
        userId,
        items: orderItems,
        total,
        status: "Placed"
      });

      await order.save();

      // Clear cart
      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } }
      );

      res.status(201).json({ 
        message: 'Order placed successfully',
        order 
      });

    } catch (error) {
      console.error('Checkout error:', error);
      res.status(500).json({ 
        message: 'Checkout failed',
        error: error.message 
      });
    }
  },

  // Get user's orders
  getUserOrders: async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId })
        .sort({ createdAt: -1 });
      
      res.status(200).json(orders);
    } catch (error) {
      console.error('Get user orders error:', error);
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  },

  // Get all orders (admin only)
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.error('Get all orders error:', error);
      res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
  },

  // Update order status (admin only)
  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json({ message: 'Order status updated', order });
    } catch (error) {
      console.error('Update order status error:', error);
      res.status(500).json({ message: 'Update failed', error: error.message });
    }
  }
};

module.exports = orderController;
