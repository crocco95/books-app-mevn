const social = require('../models/social');

const list = async ( userId ) => {

  const f = {
    following: [],
    followers: []
  }

  return social.find({userId})
    .then( res => f.following = res)
    .then( () => social.find({followingUserId: userId}))
    .then( res => f.followers = res)
    .then( () => f);
};

const get = async ( userId, followingUserId ) => {
  return social.findOne({userId, followingUserId});
};

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
};

const remove = async ( userId, followingUserId ) => {
  return social.deleteOne({userId, followingUserId});
};

module.exports = {
  list,
  get,
  add,
  remove
}