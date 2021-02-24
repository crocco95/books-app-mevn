import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firebase-auth';

const state = {
  userId: false,
  idToken: false,
}

const getters = {
  getUserId: (state) => state.userId,
  getIdToken: (state) => state.idToken,
}

const mutations = {
  setUserId: (state,userId) => ( state.userId = userId ),
  setIdToken: (state,idToken) => ( state.idToken = idToken ),
}

const actions = {
  
  async login({commit}, params) {

    return firebase
        .auth()
        .signInWithEmailAndPassword(params.email, params.password)
        .then( userCredential => userCredential.user)
        .then( user => {

          // Save user id in state
          commit('setUserId', user.uid);
          return user.getIdToken();
        })
        .then( idToken => commit('setIdToken', idToken) );
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