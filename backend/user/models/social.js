const mongoose = require('mongoose');

const SocialSchema = mongoose.Schema({
  userId: {
    type: String,
    index: true,
    required: true
  },
  followingUserId: {
    type: String,
    index: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Social', SocialSchema);