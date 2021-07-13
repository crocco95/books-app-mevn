const socialService = require('../../services/SocialService');
const profileService = require('../../services/ProfileService');
let profileList = [];
const userId = 'yvphy03pftV0qCMxRXzcUnocC912';
let follower;
const dbUtil = require('../../utils/db');

const addRandomProfile = () => {
    return profileService.add({
        _id: 'test' + Math.round(Math.random() * 10000),
        name: 'Lorem',
        surname: 'Ipsum',
        genre: 'Female'
    });
};

beforeAll(async () => {
    await dbUtil.connect();

    profileList = await profileService.list();
});

afterAll(async () => {
    await dbUtil.disconnect()
});

test('Add a new social relationship', async () => {

    if(profileList.length <= 0){
        try{
            const profile = await addRandomProfile();

            profileList.push(profile);
        }catch (ex){
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    }

    const index = Math.round(Math.random() * (profileList.length - 1));
    follower = profileList[index];
    const social = await socialService.add(userId, follower._id);

    expect(social).toBeDefined();
    expect(social.userId).toBe(userId);
    expect(social.followingUserId).toBe(follower._id);
});

test('List user social relations', async () => {
    const relations = await socialService.list(userId);

    expect(relations).toBeDefined();
    expect(relations.following.length).toBe(1);
});

test('Remove a user relation', async () => {
   const remove = await socialService.remove(userId, follower._id);
   expect(remove).toBeDefined();
});

/*
test('Add the same follow relation twice and expect to fail', async () => {

});
 */