const pick = require('../utils/pick');
const BookService = require('../services/BookService');

const list = async (req,res) => {

  const params = pick(req.query, ['query', 'filter', 'limit', 'orderBy']);
  
  BookService
    .list(params.query, params.filter, params.limit, params.orderBy)
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
  list
}