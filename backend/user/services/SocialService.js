const social = require('../models/social');

/**
 * List all users follow an user and all users the user follow.
 * The function return an object with 2 array attributes called "following" and "followers".
 * The arrays contain the social objects NOT the user objects.
 * The user subject is identified by userId param.
 * @param {String} userId 
 */
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

/**
 * Retrieve a specific social relation of type "a user identified by userId follow the user identified by followingUserId"
 * @param {String} userId 
 * @param {String} followingUserId 
 */
const get = async ( userId, followingUserId ) => {
  return social.findOne({userId, followingUserId});
};

/**
 * Add a new social relation of kind: a user identified by userId follow another user identified by followingUserId
 * @param {String} userId 
 * @param {String} followingUserId 
 */
const add = async ( userId, followingUserId ) => {

  return social
    .findOne({userId, followingUserId})
    .then( res => {
      if( res ){
        throw new TypeError(`The user ${userId} already follow the user ${followingUserId}`);
      }
    })
    .then(() => social.create({userId, followingUserId}));
};

/**
 * Remove a social relation
 * @param {String} userId 
 * @param {String} followingUserId 
 */
const remove = async ( userId, followingUserId ) => {
  return social.deleteOne({userId, followingUserId});
};

module.exports = {
  list,
  get,
  add,
  remove
}