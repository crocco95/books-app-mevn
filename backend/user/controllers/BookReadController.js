const bookRead = require("../models/bookRead");

const firebaseAdmin = require('firebase-admin');
const bookReadService = require('../services/BookReadService');

const add = ( req, res ) => {

  firebaseAdmin
    .auth()
    .verifyIdToken( idToken )
    .then( decodedToken => 
      bookReadService
        .add(
        decodedToken.uid,
        req.body.bookId,
        req.body.currentPage,
        req.body.startDate,
        req.body.finishDate,
      )
    )
    .then( rd => res.status(201).json(rd) )
    .catch( err => res.status(400).json(err));

};

module.exports = {
  add,
}