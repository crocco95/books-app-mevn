const db = require('../utils/db');

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