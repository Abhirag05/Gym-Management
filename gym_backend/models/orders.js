const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String
  }],
  total: { type: Number, required: true },
  status: { type: String, default: "Placed" }, // "Placed", "Processing", "Completed"
  createdAt: { type: Date, default: Date.now }
});

const OrderModel=mongoose.model("order",OrderSchema)
module.exports=OrderModel