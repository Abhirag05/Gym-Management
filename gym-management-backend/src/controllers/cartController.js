const Cart = require('../models/Cart');
const Product = require('../models/Product');

const cartController = {
  // Add item to cart
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity = 1 } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ message: "User ID and Product ID are required" });
      }

      // Find existing cart for user
      let cart = await Cart.findOne({ userId });

      if (cart) {
        // Check if product already exists in cart
        const existingItem = cart.items.find(item => 
          item.productId.toString() === productId
        );

        if (existingItem) {
          existingItem.quantity += Number(quantity);
        } else {
          cart.items.push({ productId, quantity });
        }
      } else {
        // Create new cart
        cart = new Cart({
          userId,
          items: [{ productId, quantity }]
        });
      }

      await cart.save();
      res.status(201).json({ message: 'Item added to cart', cart });
    } catch (error) {
      console.error('Add to cart error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get cart by user ID
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId })
        .populate({
          path: 'items.productId',
          match: { _id: { $ne: null } }
        });

      if (!cart) {
        return res.status(200).json({ items: [] });
      }

      // Filter out any items where product was not populated
      const validItems = cart.items.filter(item => item.productId);

      res.status(200).json({
        items: validItems.map(item => ({
          _id: item._id,
          productId: {
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            imageUrl: item.productId.imageUrl,
            category: item.productId.category,
            brand: item.productId.brand
          },
          quantity: item.quantity
        }))
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ 
        message: 'Failed to fetch cart',
        error: error.message 
      });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    const { userId, itemId } = req.params;
    const cartItemId = itemId;

    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Remove the item by its _id
      cart.items = cart.items.filter(item => item._id.toString() !== cartItemId);

      await cart.save();
      res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Clear cart
  clearCart: async (req, res) => {
    const { userId } = req.params;

    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.items = [];
      await cart.save();

      res.status(200).json({ message: 'Cart cleared successfully', cart });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ message: 'Server error while clearing cart', error: error.message });
    }
  }
};

module.exports = cartController;
