<template>
  <div>
    <div class="mt-5">
      <span class="h1">👋</span>
      <h1 v-text="title"></h1>
      <h4 class="text-muted">We hope to see you soon again</h4>
    </div>
    <div class="mt-3">
      <router-link to="/" class="mx-2 btn btn-link">Return to Homepage</router-link>
      <router-link to="/login" class="mx-2 btn btn-primary">Go to Login page</router-link>
    </div>
  </div>
</template>

<script>

import {mapActions} from 'vuex';

export default {

  data(){
    return {
      title: 'Logging out ...',
    }
  },

  methods:{
    ...mapActions(['logout']),
  },

  mounted(){
    this.logout()
      .then(() => this.title = 'Logged out!')
      .catch( () => this.title = 'Problems during the log out procedure...');
  }
}
</script>

<style>

</style>