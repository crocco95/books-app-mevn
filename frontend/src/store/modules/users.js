import axios from 'axios';
import { auth } from 'firebase/app';

const state = {
  user: false,
}

const getters = {
  getUser: (state) => state.user,
}

const mutations = {
  setUser: (state,user) => ( state.user = user ),
}

const actions = {
  
}


export default {
  state,
  getters,
  actions,
  mutations
}