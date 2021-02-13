import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firebase-auth';

const state = {
  user: false,
  profile: false,
  idToken: false,
}

const getters = {
  getUser: (state) => state.user,
  getProfile: (state) => state.profile,
  getIdToken: (state) => state.idToken,
}

const mutations = {
  setUser: (state,user) => ( state.user = user ),
  setProfile: (state,profile) => ( state.profile = profile ),
  setIdToken: (state,idToken) => ( state.idToken = idToken ),
}

const actions = {
  
  async login({commit}, params) {

    return firebase
        .auth()
        .signInWithEmailAndPassword(params.email, params.password)
        .then( userCredential => userCredential.user.getIdToken(true))
        .then( idToken => {

          // Save idToken in state
          commit('setIdToken', idToken);
        });
  },

  async register({commit}, prams){
    return firebase
        .auth()
        .createUserWithEmailAndPassword(prams.email, prams.password)
        .then( userCredential => userCredential.user.getIdToken(true))
        .then( idToken => {

          // Save idToken in state
          commit('setIdToken', idToken);

          return axios.post('http://localhost:8080/api/v1/profiles',{
            name: prams.name,
            surname: prams.surname,
            genre: prams.genre,
          },{
            headers: {
              'Authorization': idToken
            },
          });

        });
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}