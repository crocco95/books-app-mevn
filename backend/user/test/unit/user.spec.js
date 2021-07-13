const userService = require('../../services/UserService');
const userId = 'yvphy03pftV0qCMxRXzcUnocC912';

beforeAll(() => {
    // Setting up Firebase Admin SDK
    const firebaseAdmin = require('firebase-admin');
    const serviceAccount = require("../../config/serviceAccountKey.json");

    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount)
    });
});

test('Test retrieve a specific user', async () => {
    const user = await userService.get(userId);
    expect(user.uid).toBe(userId);
});