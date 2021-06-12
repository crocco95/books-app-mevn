const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth');
const bookReadController = require('../controllers/BookReadController');
const validator = require('../validators/BookReadValidator');

router
  .route('/:bookId/read')
  .get(bookReadController.list);

router
  .route('/read/search')
  .get(bookReadController.search);

router
  .route('/:bookId/read/:userId')
  .get(bookReadController.get);

router
  .route('/:bookId/read')
  .post(authMiddleware.extractUserIdFromTokenToBody, validator.add, bookReadController.add);

router
  .route('/:bookId/read')
  .put(authMiddleware.extractUserIdFromTokenToBody, bookReadController.edit);

router
  .route('/:bookId/read')
  .delete(authMiddleware.extractUserIdFromTokenToBody, bookReadController.remove);

module.exports = router;