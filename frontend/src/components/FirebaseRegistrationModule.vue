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

    <!-- START Registration form -->
    <div class="row">
      <div class="col-md-12">
        <form class="text-start" @submit="registerWithEmailAndPassword">

          <!-- START Name field -->
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="name"
              class="form-control"
              placeholder="Your name"
              id="name"
              v-model="name"
              required
              :disabled="isLoading" />
          </div>
          <!-- END Name field -->

          <!-- START Surname field -->
          <div class="mb-3">
            <label for="surname" class="form-label">Surname</label>
            <input type="surname"
              class="form-control"
              placeholder="Your surname"
              id="surname"
              v-model="surname"
              required
              :disabled="isLoading" />
          </div>
          <!-- END Surname field -->

          <!-- START Genre field -->
          <div class="mb-3">
            <label for="genre" class="form-label">Genre</label>
            <select name="genre" id="genre" class="form-select" v-model="genre">
              <option value="none">I don't want say that</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <!-- END Genre field -->

          <!-- START Email field -->
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email"
              class="form-control"
              placeholder="Your email address"
              id="email"
              v-model="email"
              required
              aria-describedby="emailHelp"
              :disabled="isLoading" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <!-- END Email field -->

          <!-- START Password field -->
          <div class="mb-3">
            <label for="pasword" class="form-label">Password</label>
            <input type="password"
              class="form-control"
              placeholder="Choose a secure password!"
              id="pasword"
              v-model="password"
              required
              :disabled="isLoading" />
          </div>
          <!-- END Password field -->

          <!-- START Password confirmation field -->
          <div class="mb-3">
            <label for="pasword-confirm" class="form-label">Confirm the password</label>
            <input type="password"
              class="form-control"
              placeholder="Repeat the password"
              id="pasword-confirm"
              v-model="passwordConfirm"
              required
              :disabled="isLoading" />
          </div>
          <!-- END Password confirmation field -->

          <!-- START Terms & Conditions checkbox -->
          <div class="mb-3 form-check">
            <input type="checkbox"
              class="form-check-input"
              id="agreement" required
              :disabled="isLoading">
          <label class="form-check-label" for="agreement">I have read the Terms & Conditions</label>
          </div>
          <!-- END Terms & Conditions checkbox -->

          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading"> {{ isLoading ? 'Loading ...' : 'Sign Up NOW !' }} </button>
        </form>
      </div>
    </div>
    <!-- END Registration form -->

  </div>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/firebase-auth';

import axios from 'axios';

export default {

  data(){
    return {
      name: '',
      surname: '',
      genre: 'none',
      email: '',
      password: '',
      passwordConfirm: '',
      error: '',
      isLoading: false,
    }
  },

  methods: {
    registerWithEmailAndPassword: function( event ){

      event.preventDefault();

      if( this.password !== this.passwordConfirm ){
        alert("You wrote two different passwords");
        return;
      }

      this.isLoading = true;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then( userCredential => userCredential.user.getIdToken(true))
        .then( idToken => {

          return axios.post('http://localhost:3000/api/v1/profiles',{
            name: this.name,
            surname: this.surname,
            genre: this.genre,
          },{
            headers: {
              'Authorization': idToken
            }
          });

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