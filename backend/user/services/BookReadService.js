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
};

const edit = (userId, bookId, params) => {
  return bookRead
    .updateOne({userId, bookId}, params)
    .then( () => bookRead.findOne({userId, bookId}));
};

const remove = (userId, bookId) => {
  return bookRead.deleteMany({userId, bookId});
}

module.exports = {
  list,
  get,
  add,
  edit,
  remove,
}