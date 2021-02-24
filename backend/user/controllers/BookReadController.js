const bookReadService = require('../services/BookReadService');

const list = ( req, res ) => {
  
  const userId = req.params.userId;

  bookReadService
    .list(userId)
    .then( rb => res.status(200).json(rb) )
    .catch( err => res.status(400).json(err));
};

const get = ( req, res ) => {

  const userId = req.params.userId;
  const bookId = req.params.bookId;

  bookReadService
    .get( userId, bookId )
    .then( rb => res.status(200).json(rb))
    .catch( err => res.status(400).json(err));
};

const add = ( req, res ) => {

  const userId = req.body.tokenUserId;

  if( !userId ){
    res.status(403).json({
      message: 'You are not allowed',
      code: 403,
    });
    return;
  }

  bookReadService
    .add(
      userId,
      req.body.bookId,
      req.body.currentPage,
      req.body.startDate,
      req.body.finishDate,
    )
    .then( rd => res.status(201).json(rd) )
    .catch( err => res.status(400).json(err));

};

module.exports = {
  list,
  get,
  add,
}