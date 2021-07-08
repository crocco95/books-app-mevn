const axios = require('axios');
const googleConfig = require('../config/google.config');

/**
 *
 * @param params
 */
const list = async (params) => {

  params = {
    q: params.query,
    filter: params.filter,
    orderBy: params.orderBy,
    maxResults: params.limit,
    projection: params.projection,
    key: googleConfig.booksApiKey,
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
    key: googleConfig.booksApiKey,
    projection: projection
  };

  console.log("Called list BookService.get with params: " + JSON.stringify(params));

  return axios({
    method: 'GET',
    url: `https://www.googleapis.com/books/v1/volumes/${id}`,
    params: params,
  });
}

module.exports = {
  list,
  get
}