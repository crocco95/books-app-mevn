const Review = require('../models/review');

const list = ( bookId ) => {
  return Review
    .find({ bookId: bookId });
}

const get = (bookId, reviewId) => {
  return Review
          .findOne({ bookId: bookId, _id: reviewId });
}

const add = async ( bookId, userId, title, description, vote ) => {

  const params = {
    bookId,
    userId,
    title,
    description,
    vote,
  };

  return Review
          .find({bookId: bookId, userId: userId})
          .then( res => {
            if(res.length > 0){
              throw {
                code: 400,
                message: 'You have already wrote a review for this book.',
              }
            }
          })
          .then(() => Review.create(params));
}

const edit = () => {
  
}

module.exports = {
  list,
  get,
  add,
  edit,
}