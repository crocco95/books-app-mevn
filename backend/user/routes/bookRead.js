const express = require('express');
const router = express.Router();

const BookReadController = require('../controllers/BookReadController');

router
  .route('/me/books')
    .post(BookReadController.add);

module.exports = router;