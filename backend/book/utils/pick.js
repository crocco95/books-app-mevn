/**
 * Create an object composed of the picked object properties
 * 
 * Source : https://github.com/hagopj13/node-express-boilerplate/blob/38b4d1084e802bbe40319017b40c71793d259d03/src/utils/pick.js
 * 
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = pick;