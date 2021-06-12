const Preference = require("../models/Preference");

const list = (userId) => {
  return Preference.findOne({userId});
}

const get = (userId, category) => {

  const cat = `p.categories.${category}`;
}

const add = (preference) => {
  return Preference.create(preference);
}

const edit = (preference) => {
  const pc = `preferredCategories.${preference.category}`;
  const action = preference.action === 'inc' ? '$inc' : '$dec';

  return Preference.updateOne({userId: preference.userId}, {
    [action] : {
      [pc] : 1
    }
  }, {
    new: true,
  });
}

module.exports = {
  list,
  add,
  edit,
}