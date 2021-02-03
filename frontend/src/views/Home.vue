<template>
  <div class="container home">
    <img alt="App logo" src="../assets/logo.png" width="150">
    <h1 class="text-left">Welcome to Books App!</h1>
    
    <h2 class="mt-5">Humor</h2>
    <LatestBooks category="humor" limit="12"/>

    <h2 class="mt-5">History</h2>
    <LatestBooks category="history" limit="12"/>

    <h2 class="mt-5">Travel</h2>
    <LatestBooks category="travel" limit="12"/>
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
