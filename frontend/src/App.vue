<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img alt="App logo" src="./assets/logo.png" width="30">
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
          <li class="nav-item" v-if="userId">
            <router-link class="nav-link" :to="'/profiles/' + userId">My Profile</router-link>
          </li>

          <li class="nav-item" v-if="!userId">
              <router-link to="/register" class="nav-link mx-1">Register</router-link>
          </li>
          <li class="nav-item" v-if="!userId">
            <router-link to="/login" class="nav-link mx-1">
              <button class="btn btn-sm btn-success">Login</button>
            </router-link>
          </li>
          <li class="nav-item" v-if="userId">
            <router-link to="/logout" class="nav-link mx-1">
              <button class="btn btn-sm btn-secondary">Logout</button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
export default {
  data(){
    return{
      userId: ''
    }
  },

  mounted(){
    this.userId = window.localStorage.getItem('_userId');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
