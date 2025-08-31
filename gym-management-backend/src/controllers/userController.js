const User = require('../models/User');

const userController = {
  // Get all users (admin only)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get user profile by email
  getProfile: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email }).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const profileData = {
        name: user.name,
        email: user.email,
        age: user.age,
        weight: user.weight,
        height: user.height,
        joinDate: user.joinDate
      };

      // Include avatar data if it exists
      if (user.avatar && user.avatar.data) {
        profileData.avatar = user.avatar.data.toString('base64');
        profileData.avatarContentType = user.avatar.contentType;
      }

      res.json(profileData);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      const { age, weight, height } = req.body;
      const updateData = { age, weight, height };
      
      if (req.file) {
        updateData.avatar = {
          data: req.file.buffer,
          contentType: req.file.mimetype
        };
      }

      const updatedUser = await User.findOneAndUpdate(
        { email: req.params.email },
        updateData,
        { new: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = userController;
