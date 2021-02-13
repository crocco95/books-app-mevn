const mongoose = require('mongoose');

const BookReadSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: true
  },
  currentPage: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  finishDate: {
    type: Date,
  },
});

module.exports = mongoose.model('BookRead', BookReadSchema);