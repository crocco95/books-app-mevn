<template>
  <div class="latests-books">

    <div class="row" :style="`background-color:${bgSolidColor}`">

      <div class="line-header">
        <div class="dark-overlay" :style="`background: ${bgColor};`"></div>
        <div class="w-100 text-center">
          <h1 class="title w-100" :style="`color: ${titleColor}`">{{ title }}</h1>
        </div>
        <img v-if="imageUri" :src="imageUri" alt="">
      </div>

      <div class="col col-md-3 col-sm-4 col-6"
        v-for="book in books"
        :key="book.id">
        
        <router-link :to="'/books/' + book.id">
          <BookPreviewCard
          :id="book.id"
          :coverUrl="book?.volumeInfo?.imageLinks?.thumbnail"
          :title="book.volumeInfo.title"
          :subtitle="book.volumeInfo.subtitle"
          :description="book.volumeInfo.description"
          :authors="book.volumeInfo.authors"/>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>

import BookPreviewCard from './BookPreviewCard.vue';
import axios from 'axios';
import httpUtils from '../utils/http';
import categories from '../config/books_categories';

export default {
  name: 'LatestBooks',

  props: {
    category: String
  },

  data(){
    return {
      books: [],
      imageUri: '',
      bgColor: '',
      bgSolidColor: '',
      title: '',
      titleColor: '',
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

    const category = categories.categories[this.category.toLowerCase];

    this.fetchBooks();

    this.imageUri = category?.imageUri ?? `https://source.unsplash.com/250x350/?${this.category}`;
    this.bgSolidColor = category?.color ?? '#cccccc';
    this.bgColor = `linear-gradient(90deg, ${this.bgSolidColor}44 0%, ${this.bgSolidColor}aa 75%, ${this.bgSolidColor}ff 100%);`;
    this.title = category?.title ?? this.category.toUpperCase();
    this.titleColor = category?.titleColor ?? '#ffffff';
  }
}
</script>

<style lang="scss" scoped>

a {
    text-decoration: none!important;
}

.latests-books{

  /* The heart of the matter */
  .row {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    border-radius: 10px;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;

    .title{
      position: absolute;
      text-align: center;
      font-weight: bolder;
      
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;

      height: 100%;
    }

    .col {
      display: inline-block;
    }
  }
}
  

  @media screen and (min-width: 1000px) {
    .line-header {
      position: relative;
      display: inline-block;
      width: 250px;
      padding-left: 0;
      background-color: #fff;

      .dark-overlay{
        position: absolute;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
      }

      img {
        display: inline-block;
        width: 250px;
        
        border-radius: 10px 0 0 10px;
      }
    }
  }
</style>