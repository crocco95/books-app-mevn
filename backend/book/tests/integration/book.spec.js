const request = require('supertest');
const express = require('express');
const routes = require('../../routes');

const app = express();
app.use('/api/v1',routes);

describe('Book service integration tests', () => {

    test("Get first 5 results for 'Harry Potter' search", async () => {
        const response = await request(app).get('/api/v1/books?query=Harry+Potter&limit=5'); //use the request function that we can use the app// save the response to body variable

        expect(response.status).toBe(200);
        expect(response.body.items.length).toBe(5);
    });

    test("Get the book 'Harry Potter e la pietra filosofale", async () => {
        const response = await request(app).get('/api/v1/books/9CJWTbd-RYoC');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe('9CJWTbd-RYoC');
    });

    test("Get a random Volume ID and expect to fail with 503", async () => {
        const response = await request(app).get('/api/v1/books/notfoundtest123');

        expect(response.status).toBe(503);
    });
});