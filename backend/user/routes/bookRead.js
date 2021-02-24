const express = require('express');
const router = express.Router();
const AuthMiddleware = require('./middleware/auth');

const BookReadController = require('../controllers/BookReadController');

router
  .route('/:userId/books')
  .get(BookReadController.list);

router
  .route('/:userId/books/:bookId')
  .get(BookReadController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenToBody)
  .route('/:userId/books')
  .post(BookReadController.add);

module.exports = router;