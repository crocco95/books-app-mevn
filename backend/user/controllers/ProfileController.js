const firebaseAdmin = require('firebase-admin');
const pick = require('../utils/pick');
const profileService = require('../services/ProfileService');
const profile = require('../models/profile');

const create = async ( req, res ) => {

  let params = {
    surname: req.body.surname,
    name: req.body.name,
    genre: req.body.genre,
  }

  const idToken = req.headers.authorization;
  if( !idToken ){
    res.status(401).json({message: "Not valid Token"});
    return;
  }

  firebaseAdmin
    .auth()
    .verifyIdToken( idToken )
    .then( decodedToken => params.uid = decodedToken.uid )
    .then( () => profileService.add( params.uid, params.name, params.surname, params.genre ))
    .then( profile => res.status( 201 ).json( profile ))
    .catch( err => res.status( 400 ).json( err ));
};

const get = ( req, res ) => {

  const userId = req.params.userId;

  profileService
    .get( userId )
    .then( profile => res.status(200).json(profile) )
    .catch( err => res.status(400).json(err) );
}

module.exports = {
  create,
  get,
}