<template>
  <div class="row">
    <div class="col-md-4 col-sm-4 col-6 p-2" v-for="book in listBooks.items" :key="book.id">

      <BookPreviewCard
        :id="book.id"
        :coverUrl="book?.volumeInfo?.imageLinks?.thumbnail"
        :title="book.volumeInfo.title"
        :subtitle="book.volumeInfo.subtitle"
        :description="book.volumeInfo.description"
        :authors="book.volumeInfo.authors"/>

    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import BookPreviewCard from './BookPreviewCard.vue'

export default {
  components: { BookPreviewCard },
  
  computed: {
    ...mapGetters(['listBooks'])
  },
}
</script>

<style>

</style>