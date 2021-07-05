const bookService = require('../services/BookService');
const bookReadService = require('../services/BookReadService');
const amqpController = require('./AmqpController');
const { validationResult } = require('express-validator');
const amqpConfig = require('../config/amqp.config');

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
const add = async (req, res) => {

  const validation = validationResult(req).array();
  if (validation.length > 0) {
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

  /*
  * 1) BookService add the info to db
  * 2) Publish the categories associated to the book to be saved as users' preferences
  * 3) Publish the book's info and the user id to notify all users' followers
  */
  bookReadService
    .add(params)
    .then(rd => res.status(201).json(rd))
    .then(async () => notifyFollowers(params.userId, params.bookId))
    .then(() => publishPreferences(params.userId, params.bookId))
    .catch(err => res.status(400).json({
      message: err,
      code: 400
    }));
};

const publishPreferences = async (userId, bookId) => {

  return bookService
    .get(bookId, 'full')
    .then( book => {

      const categories = [];

      book.data.volumeInfo.categories.forEach(c => {

        const category = c.split(" / ")[0];

        if(category && categories.indexOf(category) === -1){
          categories.push(category);
          amqpController.publish(amqpConfig.updatePreferencesQueue, {userId, category})
        }
      });
    })
    .catch( err => console.error(err));
};

const notifyFollowers = async (userId, bookId) => {

  console.log(`Notifying users for ${userId} & ${bookId}`);
  return bookService
      .get(bookId, 'full')
      .then( response => {
        const message = {
          userId,
          book: response.data,
        }
        return amqpController.publish(amqpConfig.notifyFollowersQueue, message);
      })
      .catch( err => console.error(err));
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

const search = ( req, res ) => {

  const validation = validationResult(req).array();
  if(validation.length > 0){
    res.status(422).json(validation);
    return;
  }

  bookReadService.search(req.query)
  .then( results => res.status(200).json(results))
  .catch( err => res.status(400).json({
    message: err,
    code: 400,
  }));
}

module.exports = {
  list,
  get,
  add,
  edit,
  remove,
  search,
}