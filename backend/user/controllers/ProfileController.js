const profileService = require('../services/ProfileService');

const create = async ( req, res ) => {

  let params = {
    _id: req.body.tokenUserId,
    surname: req.body.surname,
    name: req.body.name,
    genre: req.body.genre,
    language: req.body.language,
  }

  profileService
      .add( params )
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

const edit = ( req, res ) => {

  const userId = req.params.userId;
  const params = req.body;

  profileService
    .edit( userId, params )
    .then( profile => res.status(200).json(profile) )
    .catch( err => res.status(400).json(err) );
}

module.exports = {
  create,
  get,
  edit,
}