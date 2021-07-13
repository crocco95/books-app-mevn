const pick = require('../utils/pick');
const reviewService = require('../services/ReviewService');

const list = ( req, res ) => {

  const bookId = req.params.bookId;

  reviewService
    .list(bookId)
    .then(book => res.status(200).json(book))
    .catch(error => res.status(error.code).json(error));
}

const get = ( req, res ) => {

  const bookId = req.params.bookId;
  const reviewId = req.params.reviewId;

  reviewService
      .get(bookId, reviewId)
      .then(review => res.status(200).json(review))
      .catch(error => res.status(error.code).json(error));
}

const add = ( req, res ) => {

  const params = pick( req.body , [ 'tokenUserId', 'title', 'description', 'vote' ]);
  const bookId = req.params.bookId;

  reviewService
    .add( bookId, params.tokenUserId, params.title, params.description, params.vote )
    .then(book => res.status(201).json(book))
    .catch(error => res.status(error.code || 500).json(error));
}

const edit = ( req, res ) => {
  const params = pick( req.body , [ 'tokenUserId', 'title', 'description', 'vote' ]);
  const bookId = req.params.bookId;
  const reviewId = req.params.reviewId;

  reviewService
    .edit( bookId, reviewId, params.tokenUserId, params.title, params.description, params.vote )
    .then(book => res.status(201).json(book))
    .catch(error => res.status(error.code || 500).json(error));
}

const avg = ( req, res ) => {
  const bookId = req.params.bookId;

  reviewService
    .avg(bookId)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

module.exports = {
  list,
  get,
  add,
  edit,
  avg,
}