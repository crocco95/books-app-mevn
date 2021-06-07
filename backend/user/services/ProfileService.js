const Profile = require('../models/profile');

const add = ( profile ) => {
  console.log(`Adding profile: ${JSON.stringify(profile)}`);
  return Profile.create(profile);
}

const get = ( userId ) => {
  console.log(`Getting profile by ID: ${userId}`);
  return Profile.findById(userId);
}

const edit = (userId, params) => {
  console.log(`Updating user ${userId} width data: ${JSON.stringify(params)}`);
  return Profile.findOneAndUpdate(
    {
      _id: userId
    },
    params,
    {
      new: true,
    });
}

module.exports = {
  add,
  get,
  edit,
}