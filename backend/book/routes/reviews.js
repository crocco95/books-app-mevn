const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth');

const ReviewController = require('../controllers/ReviewController');

/**
 * List all reviews associated to a specific book
 */
router
  .route('/:bookId/reviews')
  .get(ReviewController.list);

router
  .route('/:bookId/reviews/average')
  .get(ReviewController.avg);

/**
 * Get all details of a specific review
 */
router
  .route('/:bookId/reviews/:reviewId')
  .get(ReviewController.get);

/**
 * Add a new review related to a specific book
 */
router
  .route('/:bookId/reviews/')
  .post(authMiddleware.extractUserIdFromTokenToBody, ReviewController.add);

/**
 * Edit one or more field of a specific review
 */
router
  .route('/:bookId/reviews/:reviewId/')
  .put(authMiddleware.extractUserIdFromTokenToBody, ReviewController.edit);

module.exports = router;