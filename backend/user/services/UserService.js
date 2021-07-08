const firebase = require('firebase-admin');

const get = (userId) => {
    return firebase
        .auth()
        .getUser(userId);
};

module.exports = {
    get,
}