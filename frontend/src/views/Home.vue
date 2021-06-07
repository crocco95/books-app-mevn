<template>
  <div class="container home">

    <PageLoader />

    <h1 class="text-left">Welcome to Books App!</h1>
    
    <LatestBooks category="humor" limit="12" class="mt-5"/>

    <LatestBooks category="history" limit="12" class="mt-5"/>

    <LatestBooks category="travel" limit="12" class="mt-5"/>
  </div>
</template>

<script>
  import LatestBooks from '@/components/LatestBooks.vue';
  import MostReadBooks from '@/components/MostReadBooks.vue';
  import PageLoader from '@/components/PageLoader.vue';

  export default {
    name: 'Home',
    components: {
      LatestBooks,
      MostReadBooks,
      PageLoader,
    }
  }
</script>

<style scoped>

</style>
