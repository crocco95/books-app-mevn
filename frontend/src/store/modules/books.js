import axios from 'axios';

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
  async fetchBooks({ commit }, query, filter, limit, startIndex, orderBy) {

    axios
      .get('http://localhost:3000/api/v1/books?query='.concat(query),{
        method: 'get'
      })
      .then( res => {
        commit('setBooks', res.data);
      });
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}