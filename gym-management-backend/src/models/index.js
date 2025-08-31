// Central export for all models
const User = require('./User');
const Admission = require('./Admission');
const Contact = require('./Contact');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');

module.exports = {
  User,
  Admission,
  Contact,
  Product,
  Cart,
  Order
};
