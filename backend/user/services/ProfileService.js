const Profile = require('../models/profile');

const add = ( uid, name, surname, genre ) => {

  const params = {
    _id: uid,
    name,
    surname,
    genre
  };

  console.log(`Adding profile: ${JSON.stringify(params)}`);

  return Profile.create(params);
}

module.exports = {
  add
}