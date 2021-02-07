import { createStore } from 'vuex'
import axios from 'axios';
import books from './modules/books';
import users from './modules/users';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    books,
    users
  }
})
