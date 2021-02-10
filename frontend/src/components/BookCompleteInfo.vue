<template>
  <div class="row book">
    <div class="col-md-8 offset-md-2">
      <small>ID: {{ id }}</small>
      <h1 v-text="volumeInfo.title"></h1>

      <div class="row mt-5">
        <div class="col-md-4">
          <img :src="coverUrl" alt="Book's cover" class="cover float-md-start"/>
        </div>
        <div class="col-md-4 text-start">
          <h3>Authors</h3>
          <ul>
            <li v-for="author in volumeInfo.authors">{{ author }}</li>
          </ul>
        </div>
        <div class="col-md-4">
          <h3>Rating</h3>
          <h4>N/D</h4>
          <span>* * * * *</span>
        </div>
      </div>

      <!-- START Links -->
      <div class="row mt-3">
        <div class="col-md-6">
          <a :href="volumeInfo.previewLink" class="btn btn-outline-primary w-100" target="_blank">Read preview</a>
        </div>
        <div class="col-md-6" v-if="saleInfo.buyLink">
          <a :href="saleInfo.buyLink" class="btn btn-primary w-100" target="_blank">Buy it now</a>
        </div>
      </div>
      <!-- END Links -->

      <!-- START Description -->
      <div class="row mt-5">
        <div class="clearfix">
          <p v-html="volumeInfo.description" class="description"></p>
        </div>
      </div>
      <!-- END Description -->

      <div class="row mt-3">
        <div class="col-md-6 text-start">
          <h2>Users reviews</h2>
        </div>
        <div class="col-md-6">
          <ButtonAddReview :bookId="id"/>
        </div>
      </div>

      <div class="row my-3">
        <div class="col-md-12">
          <div class="alert alert-info">
            <strong>Hei!</strong> Nobody wrote a review for this book, be the first one!
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios';
import ButtonAddReview from '../components/ButtonAddReview';

export default {

  name: 'BookCompleteInfo',

  components: {
    ButtonAddReview
  },

  props: {
    id: String
  },

  data() {
    return {
      coverUrl: '',
      volumeInfo: '',
      saleInfo: '',
      reviews: [],
    }
  },

  methods: {
    fetchData(){

      axios
        .get(`http://localhost:3000/api/v1/books/${this.id}`)
        .then( res => {

          const book = res.data;

          this.coverUrl = book.volumeInfo.imageLinks?.thumbnail;

          this.volumeInfo = book.volumeInfo;
          this.saleInfo = book.saleInfo;
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