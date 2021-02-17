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
  console.log("Prams: " + JSON.stringify(req.params));
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

}

module.exports = {
  list,
  get,
  add,
  edit,
}