const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const admissionController = require('../controllers/admissionController');
const contactController = require('../controllers/contactController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { fileUpload } = require('../utils/fileUpload');

const router = express.Router();

// Legacy auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Legacy user routes
router.get('/view', verifyToken, verifyAdmin, userController.getAllUsers);
router.get('/profile/:email', verifyToken, userController.getProfile);
router.put('/profile/:email', verifyToken, upload.single('avatar'), userController.updateProfile);

// Legacy admission routes
router.post('/admission', admissionController.createAdmission);
router.get('/viewadmission', verifyToken, verifyAdmin, admissionController.getAllAdmissions);
router.get('/viewadmission/:id', verifyToken, admissionController.getAdmissionById);
router.put('/updateadmission/:id', verifyToken, admissionController.updateAdmission);
router.put('/changeadmission/:id', verifyToken, admissionController.updateAdmission);
router.get('/getAdmissionByEmail/:email', verifyToken, admissionController.getAdmissionByEmail);
router.delete('/deleteadmission/:id', verifyToken, admissionController.deleteAdmission);

// Legacy contact routes
router.post('/contact', contactController.createContact);
router.get('/viewcontact', verifyToken, verifyAdmin, contactController.getAllContacts);
router.delete('/dltmsg/:id', verifyToken, verifyAdmin, contactController.deleteContact);

// Legacy product routes
router.post('/products', verifyToken, verifyAdmin, fileUpload.single('image'), productController.createProduct);
router.get('/viewproducts', productController.getAllProducts);
router.get('/viewproducts/:id', productController.getProductById);
router.put('/products/:id', verifyToken, verifyAdmin, fileUpload.single('image'), productController.updateProduct);
router.delete('/products/:id', verifyToken, verifyAdmin, productController.deleteProduct);

// Legacy cart routes
router.post('/cart', verifyToken, cartController.addToCart);
router.get('/getcart/:userId', verifyToken, cartController.getCart);
router.delete('/removefromcart/:userId/:itemId', verifyToken, cartController.removeFromCart);
router.delete('/clearcart/:userId', verifyToken, cartController.clearCart);

// Legacy order routes
router.post('/checkout', verifyToken, orderController.checkout);
router.get('/orders/:userId', verifyToken, orderController.getUserOrders);
router.get('/vieworders', verifyToken, verifyAdmin, orderController.getAllOrders);

module.exports = router;
