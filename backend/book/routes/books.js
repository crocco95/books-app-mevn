const express = require('express');
const router = express.Router();

const BookController = require('../controllers/BookController');

router
  .route('/')
  .get(BookController.list);

router
  .route('/:volumeId');

module.exports = router;