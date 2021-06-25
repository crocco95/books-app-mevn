<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img alt="App logo" src="../assets/logo.png" width="30">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search">Search</router-link>
          </li>
          <li class="nav-item" v-if="getUser()">
            <router-link class="nav-link" :to="'/profiles/' + getUser().uid">My Profile</router-link>
          </li>
          <li class="nav-item" v-if="!getUser()">
            <router-link to="/login" class="nav-link mx-1">
              Login
            </router-link>
          </li>
          <li class="nav-item" v-if="!getUser()">
            <router-link to="/register" class="nav-link mx-1">
              <button class="btn btn-sm btn-success">Register</button>
            </router-link>
          </li>
          <li class="nav-item" v-if="getUser()">
            <router-link to="/logout" class="nav-link mx-1">
              <button class="btn btn-sm btn-secondary">Logout</button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        user: '',
      }
    },

    methods: {
      ...mapGetters(['getUser']),
    },
  }
</script>


<style scoped>
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>