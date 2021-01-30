var axios = require('axios');

/**
 * 
 * @param {String} query The search query
 * @param {*} filter 
 * @param {*} limit 
 * @param {*} orderBy 
 */
const list = async (query, filter, limit = 10, orderBy = 'relevance', projection = 'lite') => {

  const params = {
    q: query,
    filter: filter,
    orderBy: orderBy,
    maxResult: limit,
    projection, projection,
    key: process.env.GOOGLE_API_KEY,
  };

  console.log("KEY: " + process.env.GOOGLE_API_KEY);

  console.log("Called list BookService.function with params: " + JSON.stringify(params));

  return axios({
    method: 'GET',
    url: 'https://www.googleapis.com/books/v1/volumes',
    params: params,
  });
}

const get = async (id, projection = 'lite') => {
  return axios({
    method: 'GET',
    url: 'https://www.googleapis.com/books/v1/volumes/'.concat(id),
    params: {
      key: process.env.GOOGLE_API_KEY,
      projection: projection
    },
  });
}

module.exports = {
  list,
  get
}