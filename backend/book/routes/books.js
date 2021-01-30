const express = require('express');
const router = express.Router();

const BookController = require('../controllers/BookController');

router
  .route('/')
  .get(BookController.list);

router
  .route('/:volumeId')
  .get(BookController.get);

module.exports = router;