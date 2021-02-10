const pick = require('../utils/pick');
const BookService = require('../services/BookService');

/**
 * Get the list of books based on query parameters passed to
 * @param {*} req 
 * @param {*} res 
 */
const list = async (req,res) => {

  // Pick from request query just the parameters we need
  const params = pick(req.query, ['query', 'filter', 'limit', 'startIndex', 'orderBy']);
  
  // Call the service to perform the effective API call
  BookService
    .list(params.query, params.filter, params.limit, params.startIndex, params.orderBy)
    .then(response => {
      res
        .status(response.status)
        .json(response.data);
    })
    .catch(error => {
      res
        .status(error.response ? error.response.status : 500 )
        .json(error.response ? error.response.data : 'Unexpected error');
    });
}

const get = async (req,res) => {
  
  const volumeId = req.params.volumeId;

  BookService
    .get(volumeId)
    .then(response => {
      res
        .status(response.status)
        .json(response.data);
    })
    .catch(error => {
      res
        .status(error.response ? error.response.status : 500 )
        .json(error.response ? error.response.data : 'Unexpected error');
    });

}

module.exports = {
  list,
  get
}