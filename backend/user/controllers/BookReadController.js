const bookRead = require("../models/bookRead");

const firebaseAdmin = require('firebase-admin');
const bookReadService = require('../services/BookReadService');

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
  add,
}