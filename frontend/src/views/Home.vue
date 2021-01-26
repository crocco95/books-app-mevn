<template>
  <div class="container home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to Your Vue.js App</h1>
    
    <h2></h2>
    <LatestBooks limit="12"/>

    <MostReadBooks limit="12"/>
  </div>
</template>

<script>
  import LatestBooks from '@/components/LatestBooks.vue'
  import MostReadBooks from '@/components/MostReadBooks.vue'

  export default {
    name: 'Home',
    components: {
      LatestBooks,
      MostReadBooks
    }
  }
</script>

<style scoped>

</style>
