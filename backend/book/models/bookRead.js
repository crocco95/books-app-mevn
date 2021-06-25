const mongoose = require('mongoose');

const BookReadSchema = mongoose.Schema({
  userId: {
    type: String,
    index: true,
    required: true
  },
  bookId: {
    type: String,
    index: true,
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