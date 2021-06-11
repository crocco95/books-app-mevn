<template>
  <Navbar />
  <router-view v-if="readyFlag"/>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

import { mapActions } from 'vuex';

export default {
  components: {
    Navbar,
  },

  data(){
    return {
      readyFlag: false,
    };
  },

  methods:{
    ...mapActions(['registerAuthStateChangedListener']),
  },

  async mounted(){
    await this.registerAuthStateChangedListener();
    console.log("Registered auth changed listener");
    this.readyFlag = true;
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
