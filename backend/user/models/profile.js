const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  language: {
    type: String,
  },
  genre: {
    type: String,
  },
  profilePictureUri: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

module.exports = mongoose.model('Profile', profileSchema);