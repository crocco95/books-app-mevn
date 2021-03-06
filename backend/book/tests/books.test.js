const axios = require('axios');

test('List the Harry Potter books from Google API', async () => {
  const books = await axios.get('http://localhost:3000/api/v1/books?query=Harry+Potter');
  expect(books.data.items.length).toBeGreaterThan(0);
});