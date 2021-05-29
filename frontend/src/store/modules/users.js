import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firebase-auth';

const state = {
  userId: window.localStorage.getItem('_userId') || '',
  idToken: window.localStorage.getItem('_token') || '',
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

  isLogged(){
    return this.state.idToken;
  },
  
  async login({commit}, params) {

    return firebase
        .auth()
        .signInWithEmailAndPassword(params.email, params.password)
        .then( userCredential => userCredential.user)
        .then( user => {

          if( !user.emailVerified ){
            throw {
              message: 'The email address must be verified, check you email',
              code: 401
            }
          }

          // Save user id in state and 
          commit('setUserId', user.uid);
          window.localStorage.setItem('_userId', user.uid);
          return user.getIdToken();
        })
        .then( idToken => {
          commit('setIdToken', idToken);
          window.localStorage.setItem('_token', idToken);
        });
  },

  async register({commit}, prams){
    return firebase
        .auth()
        .createUserWithEmailAndPassword(prams.email, prams.password)
        .then( userCredential => {
          // Send email confirmation
          userCredential.user.sendEmailVerification();
          
          // Return the ID Token for the next step
          return userCredential.user.getIdToken(true);
        })
        .then( idToken => {

          // Save idToken in state
          commit('setIdToken', idToken);
          window.localStorage.setItem('_token', idToken)
          axios.defaults.headers.common['Authorization'] = idToken

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
  },

  async logout({commit}){
    commit('logout')
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    resolve();
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}