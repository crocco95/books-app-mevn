const db = require('../../utils/db');

describe('Test MongoDB connection', () => {

    test('MongoDB connection', async () => {

        let exception;
        let connection;

        try {
            connection = await db.connect();
        }catch(ex){
            exception = ex;
        }

        expect(exception).toBeUndefined();
        expect(connection).toBeDefined();
    });

    test('MongoDB disconnection', async () => {
        let exception;

        try {
            await db.disconnect();
        }catch(ex){
            exception = ex;
        }

        expect(exception).toBeUndefined();
    });
});