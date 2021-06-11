const bookService = require('../services/BookService');
const bookReadService = require('../services/BookReadService');
const amqpController = require('./AmqpController');
const { validationResult } = require('express-validator');

/**
 * Get all BookRead object related to a specific book
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const list = async ( req, res ) => {
  
  const bookId = req.params.bookId;

  const book = await bookService
    .get(bookId, 'lite');

  if(!book){
    res.status(404).json({
      message: `Book ${bookId} not found`,
      code: 404,
    })
    return;
  }

  bookReadService
    .list(bookId)
    .then( rb => res.status(200).json(rb) )
    .catch( err => res.status(400).json({
      message: err,
      code: 400
    }));
};

const get = ( req, res ) => {

  console.log("Ei");

  const userId = req.params.userId;
  const bookId = req.params.bookId;

  bookReadService
    .get( userId, bookId )
    .then( rb => rb ? res.status(200).json(rb) : res.status(404).json({
      message: `The user "${userId}" did not read the book "${bookId}"`,
      code: 404,
    }))
    .catch( err => res.status(400).json({
      message: err,
      code: 400
    }));
};

/**
 * Add new object to trace the book read by a user
 */
const add = ( req, res ) => {

  const validation = validationResult(req).array();
  if(validation.length > 0){
    res.status(422).json(validation);
    return;
  }

  const params = {
    userId: req.body.tokenUserId,
    bookId: req.params.bookId,
    currentPage: req.body.currentPage,
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
  }

  bookReadService
    .add(params)
    .then( rd => res.status(201).json(rd) )
    .then( () => amqpController.publish('update-preferences', {userId: params.userId, category: 'humor'}) )
    .catch( err => res.status(400).json({
      message: err,
      code: 400
    }));
};

const edit = ( req, res) => {

  const userId = req.body.tokenUserId;
  const bookId = req.params.bookId;

  const params = {
    currentPage: req.body.currentPage,
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
  };

  bookReadService
    .edit(userId, bookId, params)
    .then( rb => res.status(200).json(rb))
    .catch( err => res.status(400).json(err));
};

const remove = ( req, res ) => {

  const userId = req.body.tokenUserId;
  const bookId = req.params.bookId;

  if(req.params.userId !== userId){
    res.status(403).json({
      message: 'Unauthorized',
    })
  }

  bookReadService.remove(userId, bookId)
  .then( () => res.status(200).json())
  .catch( err => res.status(400).json(err));
};

module.exports = {
  list,
  get,
  add,
  edit,
  remove,
}