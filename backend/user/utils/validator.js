const { check } = require('express-validator/check');

const addBookRead = [
  check('bookId', 'The bookId field is required').isAlphanumeric(),
  check('userId', 'You have to be authenticated').isAlphanumeric(),
  check('currentPage', 'The currentPage field is required').isInt(),
  check('startDate', 'The startDate field is required').isDate(),
];

module.exports = {
  addBookRead,
}