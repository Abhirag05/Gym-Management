const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// User routes
router.get('/view', verifyToken, verifyAdmin, userController.getAllUsers);
router.get('/profile/:email', verifyToken, userController.getProfile);
router.put('/profile/:email', verifyToken, upload.single('avatar'), userController.updateProfile);

module.exports = router;
