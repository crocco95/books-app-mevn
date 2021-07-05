const appConfig = require('../config/app.config');

const prepareBookReadToFollower = async (currentUserProfile, follower, book) => {

    return {
        target: follower.email,
        subject: `New activity from ${currentUserProfile.name}!`,
        textBody: `Your friend ${currentUserProfile.name} started to read the book "${book.volumeInfo.title}" `,
        htmlBody: `Your friend <a href="${appConfig.frontendBaseUrl}/profiles/${currentUserProfile._id}">${currentUserProfile.name}</a> started to read the book <a href="${book.id}">${book.volumeInfo.title}</a>`,
    };
}

module.exports = {
    prepareBookReadToFollower,
};