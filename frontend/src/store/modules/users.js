import axios from 'axios';
import firebaseApp from '../../config/firebase';
import 'firebase/firebase-auth';

const state = {
  user: firebaseApp.app.auth().currentUser,
  isLoadedFlag : false,
}

const getters = {
  getUser: (state) => state.user,
  isLogged: (state) => !!state.user,
  isLoaded: (state) => state.isLoadedFlag,
}

const mutations = {
  setUser: (state,user) => ( state.user = user ),
  setLoadedFlag: (state, value) => ( state.isLoadedFlag = value )
}

const actions = {

  async registerAuthStateChangedListener({commit}){
    return firebaseApp.app
        .auth()
        .onAuthStateChanged(async (user) => {

            if (user && user.emailVerified) {

                commit('setUser', user);

                user.getIdToken().then(token => {

                    commit('setLoadedFlag', true);

                    // Add a request interceptor
                    axios.interceptors.request.use(function(config) {
                        config.headers.Authorization = token;
                        return config;
                    });
                });
            } else {
                commit('setLoadedFlag', true);
            }
        })
  },
  
  async login({commit}, params) {

    return firebaseApp.app
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

          commit('setUser', user);

          return user.getIdToken();
        })
        .then( idToken => {
          axios.defaults.headers.common['Authorization'] = idToken;
        });
  },

  async register({commit}, prams){
    return firebaseApp.app
        .auth()
        .createUserWithEmailAndPassword(prams.email, prams.password)
        .then( userCredential => {

          // Send email confirmation
          userCredential.user.sendEmailVerification();

          return userCredential.user;
        });
  },

  async logout({commit}){
    console.log("Logging out...");
    firebaseApp.app.auth().signOut().then(() => {
      delete axios.defaults.headers.common['Authorization'];
      commit('setUser', null);
    })
    .catch(error => console.error(`Impossible to logout: ${error}`));
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}