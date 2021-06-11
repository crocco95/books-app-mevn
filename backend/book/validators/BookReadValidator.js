const { body, param, oneOf } = require('express-validator');
const bookService = require('../services/BookService');

const addBookRead = [
  param('bookId').exists().custom( bookId => {
    console.log(`Validating ${bookId}...`);
    return bookService
      .get(bookId, 'lite')
      .then( book => {
        if(!book){
          return Promise.reject('The bookId field must be valid');
        }
      });
  }),
  body('tokenUserId', 'You have to be authenticated').exists(),
  body('currentPage', 'The currentPage field is required').isInt(),
  body('startDate', 'The startDate field is required').isDate(),
];

module.exports = {
  addBookRead,
}