const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phonenumber: {
    type: String,
    required: true,
    trim: true
  },
  fitnessgoal: {
    type: String,
    required: true
  },
  selectedplan: {
    type: String,
    required: true
  },
  payment: {
    method: {
      type: String,
      enum: ['online', 'offline'],
      default: 'online'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed'
    }
  }
}, {
  timestamps: true
});

const Admission = mongoose.model('Admission', AdmissionSchema);
module.exports = Admission;
