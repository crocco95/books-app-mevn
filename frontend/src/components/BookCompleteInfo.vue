<template>
  <div class="row book">
    <div class="col-md-8 offset-md-2">
      <small>ID: {{ id }}</small>
      <h1 v-text="title"></h1>
      <div class="row mt-5">
        <div class="clearfix">
          <img :src="coverUrl" alt="Book's cover" class="cover float-md-start"/>
          <p v-html="description" class="description "></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {

  name: 'BookCompleteInfo',

  props: {
    id: String
  },

  data() {
    return {
      coverUrl: '',
      title: '',
      description: '',
      releaseDate: ''
    }
  },

  methods: {
    fetchData(){

      axios
        .get(`http://localhost:3000/api/v1/books/${this.id}`)
        .then( res => {

          const book = res.data;

          this.coverUrl = book.volumeInfo.imageLinks?.thumbnail;
          this.title = book.volumeInfo.title;
          this.description = book.volumeInfo.description;

          console.log(res.data);
        })
        .catch( err => {
          console.error( err );
        });
    }
  },

  mounted(){
    this.fetchData()
  }
}
</script>

<style scoped>

  img.cover{
    margin: 0 25px 0 0;
  }

  .description{
    text-align: justify;
  }
</style>