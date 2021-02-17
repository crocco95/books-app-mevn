const express = require('express');
const router = express.Router();

const BookReadController = require('../controllers/BookReadController');

router
  .route('/:userId/books')
  .post(BookReadController.add);

module.exports = router;