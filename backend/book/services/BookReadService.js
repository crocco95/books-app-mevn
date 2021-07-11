const bookRead = require('../models/bookRead');

const list = async ( bookId ) => {
  return bookRead.find({bookId});
};

const get = async ( userId, bookId ) => {
  return bookRead.findOne({userId, bookId});
};

const add = async (userId, bookId, currentPage, startDate, finishDate) => {

  const params = {
    userId,
    bookId,
    currentPage,
    startDate,
    finishDate,
  };

  return bookRead.find({userId: params.userId, bookId: params.bookId})
  .then( result => {
    
    if( result.length > 0 ){
      throw new Error('You have already registered this book read');
    }

    return bookRead.create(params);
  });
};

const edit = async (userId, bookId, params) => {
  return bookRead
    .updateOne({userId, bookId}, params)
    .then( () => bookRead.findOne({userId, bookId}));
};

const remove = async (userId, bookId) => {
  return bookRead.deleteMany({userId, bookId});
}

const search = async ( query ) => {
  return bookRead.find( query );
}

module.exports = {
  list,
  get,
  add,
  edit,
  remove,
  search,
}