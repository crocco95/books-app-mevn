<template>
  <div class="latests-books">

    <div class="row pb-4">
      <div class="col col-md-3 col-sm-4 col-6"
        v-for="book in books"
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

  </div>
</template>

<script>

import BookPreviewCard from './BookPreviewCard.vue';
import axios from 'axios';
import httpUtils from '../utils/http';

export default {
  name: 'LatestBooks',

  props: {
    category: String
  },

  data(){
    return {
      books: []
    }
  },

  components: {
    BookPreviewCard
  },

  methods:{
    fetchBooks(){

      const params = {
        query: 'subject:' + this.category,
        orderBy: 'newest',
      }

      axios
        .get(`http://localhost:8080/api/v1/books?` + httpUtils.paramsToUrlQuery(params))
        .then( res => {
          this.books = res.data.items;
        })
        .catch( err => {
          console.error(err);
        });
    }
  },

  mounted(){
    this.fetchBooks()
  }
}
</script>

<style lang="scss" scoped>

  /* The heart of the matter */
  .row {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  .row > .col {
    display: inline-block;
  }

</style>