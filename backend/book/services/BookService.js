var axios = require('axios');

/**
 * 
 * @param {String} query The search query
 * @param {*} filter 
 * @param {*} limit 
 * @param {*} orderBy 
 */
const list = async (params) => {

  params = {
    q: params.query,
    filter: params.filter,
    orderBy: params.orderBy,
    maxResults: params.limit,
    projection: params.projection,
    key: process.env.GOOGLE_API_KEY,
    langRestrict: params.lang,
  };

  console.log("Called list BookService.list with params: " + JSON.stringify(params));

  return axios({
    method: 'GET',
    url: 'https://www.googleapis.com/books/v1/volumes',
    params: params,
  });
}

const get = async (id, projection = 'lite') => {

  const params = {
    key: process.env.GOOGLE_API_KEY,
    projection: projection
  };

  console.log("Called list BookService.get with params: " + JSON.stringify(params));

  return axios({
    method: 'GET',
    url: 'https://www.googleapis.com/books/v1/volumes/'.concat(id),
    params: params,
  });
}

module.exports = {
  list,
  get
}