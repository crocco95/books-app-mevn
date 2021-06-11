const bookRead = require('../models/bookRead');

const list = ( bookId ) => {
  return bookRead.find({bookId});
};

const get = ( userId, bookId ) => {
  return bookRead.findOne({userId, bookId});
};

const add = (params) => {
  return bookRead.find({userId: params.userId, bookId: params.bookId})
  .then( result => {
    
    if( result.length > 0 ){
      throw 'You have already registered this book read';
    }

    return bookRead.create(params);
  });
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