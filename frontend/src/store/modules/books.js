import axios from 'axios';
import httpUtils from '../../utils/http';

const state = {
  books: [],
}

const getters = {
  listBooks: (state) => state.books,
}

const mutations = {
  setBooks: (state,books) => ( state.books = books ),
}

const actions = {
  async fetchBooks({ commit }, params) {

    const str = httpUtils.paramsToUrlQuery(params);

    return axios
      .get('http://localhost:8080/api/v1/books?' + str,{
        method: 'get'
      })
      .then( res => commit('setBooks', res.data) );
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}