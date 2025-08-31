const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  age: {
    type: Number,
    default: 25,
    min: 16,
    max: 100
  },
  weight: {
    type: Number,
    default: 70,
    min: 30,
    max: 300
  },
  height: {
    type: Number,
    default: 170,
    min: 100,
    max: 250
  },
  avatar: {
    data: Buffer,
    contentType: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
