const bookService = require('../../services/BookService');

describe('Test Book service Google Books API', () => {

    test('List all books by searching Harry Potter', async () => {
        const result = await bookService.list({
            query: 'subject:travel',
        });

        expect(result.status).toBe(200);
    });

    test('Searching a book by its unique ID', async () => {

        const volumeId = '9CJWTbd-RYoC';

        const result = await bookService.get(volumeId);

        expect(result.status).toBe(200);
        expect(result.data?.id).toBe(volumeId);
        expect(result.data?.volumeInfo?.title).toBe('Harry Potter e la Pietra Filosofale');
    });

});