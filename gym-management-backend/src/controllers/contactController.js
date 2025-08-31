const Contact = require('../models/Contact');

const contactController = {
  // Create new contact message
  createContact: async (req, res) => {
    try {
      const newContact = new Contact(req.body);
      const savedContact = await newContact.save();

      res.status(201).json({
        message: "Message sent successfully",
        contact: savedContact
      });
    } catch (error) {
      console.error('Create contact error:', error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Get all contact messages (admin only)
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json(contacts);
    } catch (error) {
      console.error('Get contacts error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete contact message
  deleteContact: async (req, res) => {
    try {
      const deleted = await Contact.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Contact message not found" });
      }
      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error('Delete contact error:', error);
      res.status(500).json({ message: "Delete failed", error: error.message });
    }
  }
};

module.exports = contactController;
