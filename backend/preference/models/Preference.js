const mongoose = require('mongoose');

const PreferenceSchema = mongoose.Schema({
  userId: {
    type: String,
    index: true,
    required: true
  },
  categories: {
    type: Object,
  },
});

module.exports = mongoose.model('Preference', PreferenceSchema);