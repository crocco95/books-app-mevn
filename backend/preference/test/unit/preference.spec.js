const preferenceService = require('../../services/UserPreferenceService');
const dbUtil = require('../../utils/db');
const testUserId = 'test-user-123';


describe('Unit tests for UserPreferenceService', () => {

    beforeAll(async () => {
        await dbUtil.connect();
    });

    afterAll(async () => {
        await dbUtil.disconnect();
    });

    test('Add a new "Sport" preference to a test user', async () => {
       const preference = await preferenceService.add({
           userId: testUserId,
           categories: {
               Sport: 1,
           }
       });

       expect(preference).toBeDefined();
       expect(preference.userId).toBe(testUserId);
       expect(preference.categories.Sport).toBe(1);

    });

    test('Get the test user\'s preferences', async () => {
        const preference = await preferenceService.get(testUserId);

        expect(preference).toBeDefined();
        expect(preference.userId).toBe(testUserId);
        expect(preference.categories.Sport).toBe(1);
    });

    test('Edit the test user\'s preferences', async () => {
        let preference = await preferenceService.get(testUserId);

        if(!preference){
            preference = await preferenceService.add({
                userId: testUserId,
                categories: {
                    Sport: 1,
                }
            });
        }

        const newPreference = {
            userId: testUserId,
            category: 'Humor',
        };

        const result = await preferenceService.edit(newPreference);

        expect(result).toBeDefined();
        expect(result.userId).toBe(testUserId);
        expect(result.categories.Humor).toBe(1);
    });

});