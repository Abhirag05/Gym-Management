const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');
const admissionRoutes = require('./admissions');
const contactRoutes = require('./contacts');
const productRoutes = require('./products');
const cartRoutes = require('./carts');
const orderRoutes = require('./orders');

// Mount routes with /api prefix
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admissions', admissionRoutes);
router.use('/contacts', contactRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
