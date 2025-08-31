const express = require('express');
const contactController = require('../controllers/contactController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Contact routes
router.post('/', contactController.createContact);
router.get('/', verifyToken, verifyAdmin, contactController.getAllContacts);
router.delete('/:id', verifyToken, verifyAdmin, contactController.deleteContact);

module.exports = router;
