<template>
  <div class="firebase-registration-module">

    <!-- START Error alert -->
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="alert alert-danger" v-if="error">
          <strong>Error: </strong>
          <span v-text="error.message"></span>
        </div>
      </div>
    </div>
    <!-- END Error alert -->

    <!-- START Registration form -->
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <form class="text-start" @submit="registerWithEmailAndPassword">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp" :disabled="isLoading">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="pasword" class="form-label">Password</label>
            <input type="password" class="form-control" id="pasword" v-model="password" :disabled="isLoading">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="agreement" required :disabled="isLoading">
            <label class="form-check-label" for="agreement">I have read the Terms & Conditions</label>
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading"> {{ isLoading ? 'Loading ...' : 'Sign Up NOW !' }} </button>
        </form>
        <!-- <button @click="registerWithGoogle">Register with google</button> -->
      </div>
    </div>
    <!-- END Registration form -->

  </div>
</template>

<script>

import firebase from 'firebase';

export default {

  data(){
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false,
    }
  },

  methods: {
    registerWithEmailAndPassword: function( event ){

      event.preventDefault();

      this.isLoading = true;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then( user => {
          console.log(user);
        })
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