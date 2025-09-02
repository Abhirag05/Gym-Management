const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_CONFIG = require('../config/jwt');

const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 11000) {
        return res.status(400).json({ message: "Email already exists" });
      }
      res.status(500).json({ message: "Registration failed", error: error.message });
    }
  },

  // Login user
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      // Generate token
      const token = jwt.sign(
        { id: user._id, email: user.email, isAdmin: user.isAdmin },
        JWT_CONFIG.secret,
        { expiresIn: JWT_CONFIG.expiresIn }
      );

      // Create avatar string
      let avatar = null;
      if (user.avatar && user.avatar.data) {
        avatar = `data:${user.avatar.contentType};base64,${user.avatar.data.toString('base64')}`;
      }

      // Send token in cookie
      res.cookie("token", token, JWT_CONFIG.cookieOptions);

      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: avatar,
          isAdmin: user.isAdmin
        }
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Logout user
  logout: (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    }).json({ message: "Logged out successfully" });
  }
};

module.exports = authController;
