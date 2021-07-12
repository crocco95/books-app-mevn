const profileService = require('../services/ProfileService');
const userId = 'yvphy03pftV0qCMxRXzcUnocC912';
const dbUtil = require('../utils/db');

beforeAll(async () => {
    await dbUtil.connect();
});

afterAll(async () => {
    await dbUtil.disconnect()
});

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

test('Add the same profile twice and expect to fail', async () => {

    let exception;

    try{
        await profileService.add({
            _id: userId,
            name: 'Mario2',
            surname: 'Rossi2',
            language: 'IT',
            genre: 'Male',
        });
    }catch(ex){
        exception = ex;
    }

    expect(exception).toBeDefined();
    expect(exception).toBeInstanceOf(TypeError);
});


test('Remove a profile', async () => {
    const remove = await profileService.remove(userId);
    expect(remove).toBeDefined();
});