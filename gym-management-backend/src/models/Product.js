const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['supplements', 'accessories', 'wearings']
  },
  imageUrl: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  brand: {
    type: String,
    trim: true
  },
  flavors: {
    type: [String],
    default: []
  },
  sizes: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
