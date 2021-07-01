const Preference = require("../models/Preference");

const list = (userId) => {
  return Preference.findOne({userId});
}

const add = (preference) => {
  return Preference.create(preference);
}

const edit = (preference) => {
  const pc = `categories.${preference.category}`;

  console.log(pc);

  return Preference.updateOne({userId: preference.userId}, {
    $inc : {
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