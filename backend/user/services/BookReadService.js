const bookRead = require('../models/bookRead');

const list = ( userId ) => {
  return bookRead.find({userId});
};

const add = (userId, bookId, currentPage, startDate, finishDate) => {
  const params = {
    userId,
    bookId,
    currentPage,
    startDate,
    finishDate
  };

  return bookRead.create(params);
}

module.exports = {
  list,
  add,
}