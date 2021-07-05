const profileService = require('../services/ProfileService');
const socialService = require('../services/SocialService');
const userService = require('../services/UserService');
const notificationService = require('../services/NotificationService');

const build = async (userId, book) => {

    const notifications = [];
    const currentUserProfile = await profileService.get(userId);
    const followers = await socialService
        .list(userId)
        .then(social => social.followers);

    for (const follower of followers) {

        console.log(`[INFO] Searching profile for ${follower.userId}`);

        const notification = await userService
            .get(follower.userId)
            .then(async followerUser => {
                console.log(`[INFO] Sending notification to ${followerUser.email}`);
                return await notificationService.prepareBookReadToFollower(currentUserProfile, followerUser, book);
            })
            .catch(err => console.error(`[ERROR] Error : ${err}`));

        notifications.push(notification);
    }

    return notifications;
}

module.exports = {
    build,
};