<template>
  <div class="firebase-registration-module">

    <!-- START Error alert -->
    <div class="row">
      <div class="col-md-12">
        <div class="alert alert-danger" v-if="error">
          <strong>Error: </strong>
          <span v-text="error.message"></span>
        </div>
      </div>
    </div>
    <!-- END Error alert -->

    <!-- START Login form -->
    <div class="row">
      <div class="col-md-12">
        <form class="text-start" @submit="loginWithEmailAndPassword">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp" :disabled="isLoading">
          </div>
          <div class="mb-3">
            <label for="pasword" class="form-label">Password</label>
            <input type="password" class="form-control" id="pasword" v-model="password" :disabled="isLoading">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="remember" v-model="rememberFlag" :disabled="isLoading">
            <label class="form-check-label" for="remember">Remember me</label>
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading"> {{ isLoading ? 'Loading ...' : 'Sign in' }} </button>
          <div>
            <span>Don't have an account yet? </span><router-link to="/register">Create a new one!</router-link>
          </div>
        </form>
      </div>
    </div>
    <!-- END Login form -->

  </div>
</template>

<script>

// Import Firebase Auth
import firebase from 'firebase/app';
import 'firebase/firebase-auth';

export default {

  data(){
    return {
      email: '',
      password: '',
      rememberFlag: false,
      error: '',
      isLoading: false,
    }
  },

  methods: {
    loginWithEmailAndPassword: function( event ){

      event.preventDefault();

      this.isLoading = true;

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then( userCredential => userCredential.user.getIdToken(true))
        .then( idToken => {

          // If the user checked "Remember me"
          if( this.rememberFlag ){
            console.debug("ID Token saved in local storage.");

            // Save the idToken to local storage in order to avoi login at next session
            window.localStorage.setItem('_idToken', idToken);
          }

          // Saving the idToken in session storage, when the session ends this record will be destroyed
          window.sessionStorage.setItem('_idToken', idToken);
        })
        .then(() => this.$router.push('/'))
        .catch( err => this.error = err )
        .finally( () => {
          this.isLoading = false;
        });
    }
  }
}
</script>

<style>

</style>