const { body, param, query } = require('express-validator');
const bookService = require('../services/BookService');

const add = [
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
  body('currentPage', 'The currentPage field is required').if(body('endDate').exists()).isInt(),
  body('endDate', 'The endDate field is required').if(body('currentPage').not().exists()).isDate(),
];

const search = [
  query('query').exists(true, true),
];

module.exports = {
  add,
  search,
}