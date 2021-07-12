const profileService = require('../services/ProfileService');
const userId = 'yvphy03pftV0qCMxRXzcUnocC912';
const dbUtil = require('../utils/db');

beforeAll(async () => {
    await dbUtil.connect();
})


test('Add a new profile', async () => {
    const profile = await profileService.add({
        _id: userId,
        name: 'Mario',
        surname: 'Rossi',
        language: 'IT',
        genre: 'Male',
    });

    expect(profile._id).toBe(userId);
});

test('Edit a profile', async () => {
    const profile = await profileService.edit(userId,{
        name: 'Lorem',
    });

    expect(profile).toBeDefined();
    expect(profile.name).toBe('Lorem');
});

test('Get a profile', async () => {
   const profile = await profileService.get(userId);

   expect(profile).toBeDefined();
   expect(profile._id).toBe(userId);
});