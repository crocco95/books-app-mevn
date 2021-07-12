const Profile = require('../models/profile');

const list = () => {
  return Profile.find();
}

const add = ( profile ) => {
  console.log(`Adding profile: ${JSON.stringify(profile)}`);
  return Profile
      .findOne({
        _id: profile._id
      })
      .then(result => {
        if(result){
          throw new TypeError(`The profile ${profile._id} already exists`);
        }
      })
      .then(() => Profile.create(profile));
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

const remove = (userId) => {
  return Profile.deleteOne({
    _id: userId
  });
}

module.exports = {
  list,
  add,
  get,
  edit,
  remove,
}