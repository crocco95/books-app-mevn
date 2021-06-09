<template>
  <Navbar />
  <router-view/>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import firebase from 'firebase/app';
import 'firebase/firebase-auth';

import { mapActions } from 'vuex';

export default {
  components: {
    Navbar,
  },

  methods:{
    ...mapActions(['registerAuthStateChangedListener']),
  },

  mounted(){
    this.registerAuthStateChangedListener();
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
</style>
