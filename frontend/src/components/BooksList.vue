<template>

  <div class="row" v-if="!listBooks.items">
    <div class="col-md-12">
      <div class="alert alert-info">
        <strong>Hei!</strong> Write the title of the book you are searching for or part of it inside the search bar to start
      </div>
    </div>
  </div>

  <div class="row">
    <div
    class="col-md-4 col-sm-6 col-6 mb-4"
    v-for="book in listBooks.items"
    :key="book.id">

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