const Preference = require("../models/Preference");

const get = (userId) => {
  return Preference.findOne({userId});
}

const add = (preference) => {
  return Preference.create(preference);
}

const edit = (preference) => {
  const pc = `categories.${preference.category}`;

  return Preference.findOneAndUpdate({userId: preference.userId}, {
    $inc : {
      [pc] : 1
    }
  }, {
    new: true,
  });
}

module.exports = {
  get,
  add,
  edit,
}