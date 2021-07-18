import axios from 'axios';
import httpUtils from '../../utils/http';

const state = {
  lastSearch: '',
  books: [],
  booksFinishedFlag: true,
}

const getters = {
  getBooks: (state) => state.books,
  getLastSearch: (state) => state.lastSearch,
  areBooksFinished: (state) => state.booksFinishedFlag,
}

const mutations = {
  setBooks: (state,books) => ( state.books = books ),
  setLastSearch: (state,search) => ( state.lastSearch = search ),
  setAreBooksFinishedFlag: (state,booksFinishedFlag) => ( state.booksFinishedFlag = booksFinishedFlag ),
}

const actions = {
  async fetchBooks({ commit }, params) {

    commit('setLastSearch', params);
    const str = httpUtils.paramsToUrlQuery(params);

    return axios
        .get('/books?' + str)
        .then( res => {

          commit('setBooks', res.data)
          commit('setAreBooksFinishedFlag', params.limit >= res.data.totalItems)

        });
  },

  async loadMoreBooks({commit}, params){

    const lastSearch = params.lastSearch;
    let books = params.books;

    if (lastSearch && books) {

      let newSearch = {
        query: lastSearch.query,
        limit: lastSearch.limit,
        language: lastSearch.language ?? '',
        startIndex: lastSearch.startIndex
            ? lastSearch.startIndex + lastSearch.limit
            : lastSearch.limit,
      };

      const str = httpUtils.paramsToUrlQuery(newSearch);
      return axios
          .get('/books?' + str,)
          .then( res =>  {

            books.items = books.items.concat(res.data.items);

            commit('setLastSearch', newSearch);
            commit('setBooks', books);

            commit('setAreBooksFinishedFlag',
                (newSearch.startIndex + newSearch.limit) >= books.totalItems)
          });
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}