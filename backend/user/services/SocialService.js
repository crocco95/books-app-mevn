const social = require('../models/social');

const get = async ( userId, followingUserId ) => {
  return social.findOne({userId, followingUserId});
}

const add = async ( userId, followingUserId ) => {

  return social
    .findOne({userId, followingUserId})
    .then( res => {
      if( res ){
        throw {
          message: `The user ${userId} already follow the user ${followingUserId}`
        }
      }
    })
    .then(() => social.create({userId, followingUserId}));
}

const remove = async ( userId, followingUserId ) => {
  return social.deleteOne({userId, followingUserId});
}

module.exports = {
  get,
  add,
  remove
}