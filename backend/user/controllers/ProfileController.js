const pick = require('../utils/pick');
const profileService = require('../services/ProfileService');

const create = async ( req, res ) => {
  
  let params = {
    uid: req.body.uid,
    surname: req.body.surname,
    name: req.body.name,
    genre: req.body.genre,
  }

  profileService
    .add( params.uid, params.name, params.surname, params.genre )
    .then( profile => res.status( 201 ).json( profile ))
    .catch( err => res.status( 400 ).json( err ));
};

module.exports = {
  create
}