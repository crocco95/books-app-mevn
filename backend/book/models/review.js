const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 32,
  },
  description: {
    type: String,
    minLength: 50,
    maxLength: 2048,
  },
  vote: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Review', ReviewSchema);