<template>
  <div class="latests-books">
    <h2>LatestBooks</h2>

    <BookPreviewCard class="col-md-3 col-sm-4 col-6" title="name" description="ciao" />
  </div>
</template>

<script>

import BookPreviewCard from './BookPreviewCard.vue';

export default {
  name: 'LatestBooks',
  components: {
    BookPreviewCard
  }
}
</script>

<style lang="scss" scoped>
  .latests-books {
    text-align: left;
  }
</style>