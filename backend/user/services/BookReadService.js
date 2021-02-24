const bookRead = require('../models/bookRead');

const list = ( userId ) => {
  return bookRead.find({userId});
};

const get = ( userId, bookId ) => {
  return bookRead.findOne({userId, bookId});
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
  get,
  add,
}