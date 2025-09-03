const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/database');
const corsOptions = require('./config/cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const admissionRoutes = require('./routes/admissions');
const contactRoutes = require('./routes/contacts');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/orders');
const testController = require('./controllers/testController');

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cookieParser());

// CORS configuration
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes (new structure)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Gym Management API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Gym Management API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      admissions: '/api/admissions',
      contacts: '/api/contacts',
      products: '/api/products',
      carts: '/api/carts',
      orders: '/api/orders'
    }
  });
});

// Legacy routes for backward compatibility - direct implementation
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const admissionController = require('./controllers/admissionController');
const contactController = require('./controllers/contactController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');
const { verifyToken, verifyAdmin } = require('./middleware/auth');
const upload = require('./middleware/upload');
const cloudinaryUpload = require('./utils/cloudinaryUpload');

// Auth routes
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);

// User routes
app.get('/view', verifyToken, verifyAdmin, userController.getAllUsers);
app.get('/profile/:email', verifyToken, userController.getProfile);
app.put('/profile/:email', verifyToken, upload.single('avatar'), userController.updateProfile);

// Admission routes
app.post('/admission', admissionController.createAdmission);
app.get('/viewadmission', verifyToken, verifyAdmin, admissionController.getAllAdmissions);
app.get('/viewadmission/:id', verifyToken, admissionController.getAdmissionById);
app.put('/updateadmission/:id', verifyToken, admissionController.updateAdmission);
app.put('/changeadmission/:id', verifyToken, admissionController.updateAdmission);
app.get('/getAdmissionByEmail/:email', verifyToken, admissionController.getAdmissionByEmail);
app.delete('/deleteadmission/:id', verifyToken, admissionController.deleteAdmission);

// Contact routes
app.post('/contact', contactController.createContact);
app.get('/viewcontact', verifyToken, verifyAdmin, contactController.getAllContacts);
app.delete('/dltmsg/:id', verifyToken, verifyAdmin, contactController.deleteContact);

// Product routes
app.post('/products', verifyToken, verifyAdmin, cloudinaryUpload.single('image'), productController.createProduct);
app.get('/viewproducts', productController.getAllProducts);
app.get('/viewproducts/:id', productController.getProductById);
app.put('/products/:id', verifyToken, verifyAdmin, cloudinaryUpload.single('image'), productController.updateProduct);
app.delete('/products/:id', verifyToken, verifyAdmin, productController.deleteProduct);

// Cart routes
app.post('/cart', verifyToken, cartController.addToCart);
app.get('/getcart/:userId', verifyToken, cartController.getCart);
app.delete('/removefromcart/:userId/:itemId', verifyToken, cartController.removeFromCart);
app.delete('/clearcart/:userId', verifyToken, cartController.clearCart);

// Order routes
app.post('/checkout', verifyToken, orderController.checkout);
app.get('/orders/:userId', verifyToken, orderController.getUserOrders);
app.get('/vieworders', verifyToken, verifyAdmin, orderController.getAllOrders);

// Test routes for debugging
app.get('/test/cloudinary', testController.testCloudinary);
app.get('/test/base64-products', testController.getBase64Products);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
