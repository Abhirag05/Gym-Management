const Admission = require('../models/Admission');

const admissionController = {
  // Create new admission
  createAdmission: async (req, res) => {
    try {
      const newAdmission = new Admission(req.body);
      const savedAdmission = await newAdmission.save();

      res.status(201).json({
        message: "Admission successful",
        admission: savedAdmission
      });
    } catch (error) {
      console.error('Create admission error:', error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Get all admissions (admin only)
  getAllAdmissions: async (req, res) => {
    try {
      const admissions = await Admission.find().sort({ createdAt: -1 });
      res.json(admissions);
    } catch (error) {
      console.error('Get admissions error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get admission by ID
  getAdmissionById: async (req, res) => {
    try {
      const admission = await Admission.findById(req.params.id);
      if (!admission) {
        return res.status(404).json({ message: "Admission not found" });
      }
      res.json(admission);
    } catch (error) {
      console.error('Get admission error:', error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Get admission by email
  getAdmissionByEmail: async (req, res) => {
    try {
      const admission = await Admission.findOne({ email: req.params.email });
      if (!admission) {
        return res.status(404).json({ message: "Admission not found" });
      }
      res.json(admission);
    } catch (error) {
      console.error('Get admission by email error:', error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Update admission
  updateAdmission: async (req, res) => {
    try {
      const updated = await Admission.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!updated) {
        return res.status(404).json({ message: "Admission not found" });
      }
      
      res.json({ message: "Admission updated successfully", admission: updated });
    } catch (error) {
      console.error('Update admission error:', error);
      res.status(500).json({ message: "Update failed", error: error.message });
    }
  },

  // Delete admission
  deleteAdmission: async (req, res) => {
    try {
      const admission = await Admission.findById(req.params.id);
      if (!admission) {
        return res.status(404).json({ message: "Admission not found" });
      }

      // Allow users to delete their own admission or admin to delete any
      if (req.user && (req.user.isAdmin || admission.email === req.user.email)) {
        const deleted = await Admission.findByIdAndDelete(req.params.id);
        res.json({ message: "Admission deleted successfully" });
      } else {
        return res.status(403).json({ message: "Access denied. You can only cancel your own membership." });
      }
    } catch (error) {
      console.error('Delete admission error:', error);
      res.status(500).json({ message: "Delete failed", error: error.message });
    }
  }
};

module.exports = admissionController;
