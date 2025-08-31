const express = require('express');
const admissionController = require('../controllers/admissionController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Admission routes
router.post('/', admissionController.createAdmission);
router.get('/', verifyToken, verifyAdmin, admissionController.getAllAdmissions);
router.get('/:id', verifyToken, admissionController.getAdmissionById);
router.get('/email/:email', verifyToken, admissionController.getAdmissionByEmail);
router.put('/:id', verifyToken, admissionController.updateAdmission);
router.delete('/:id', verifyToken, verifyAdmin, admissionController.deleteAdmission);

module.exports = router;
