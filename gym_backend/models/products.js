const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['supplements', 'accessories', 'wearings'] 
  },
  imageUrl: { type: String, required: true },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  flavors: { type: [String], default: [] }, // For supplements
  sizes: { type: [String], default: [] },  // For apparel
});

const ProductModel=mongoose.model("product",ProductSchema)
module.exports=ProductModel