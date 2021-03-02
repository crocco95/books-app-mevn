const social = require('../models/social');

const add = async ( userId, followingUserId ) => {

  return social
    .findOne({userId, followingUserId})
    .then( res => {
      console.log("Checking ...");
      if( res ){
        throw {
          message: `The user ${userId} already follow the user ${followingUserId}`
        }
      }
      console.log("Done.");
    })
    .then(() => social.create({userId, followingUserId}));
}

module.exports = {
  add
}