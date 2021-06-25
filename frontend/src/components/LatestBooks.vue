<template>
  <div class="latests-books" v-if="books">

    <div class="row line-header-mobile position-relative" :style="`background-image: url(${imageUriMobile})`">
      <div class="col-md-12 p-0">
        <div class="dark-overlay" :style="`background: ${bgColorMobile};`"></div>
        <div class="w-100 text-center title-container">
          <h1 class="title w-100" :style="`color: ${titleColor}`">{{ title }}</h1>
        </div>
      </div>
    </div>

    <div class="row books-row" :style="`background-color:${bgSolidColor}`">

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

import {mapGetters} from 'vuex';
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
      imageUriMobile: '',
      bgColor: '',
      bgColorMobile: '',
      bgSolidColor: '',
      title: '',
      titleColor: '',
    }
  },

  components: {
    BookPreviewCard
  },

  methods:{

    ...mapGetters(['getUser']),

    async fetchBooks() {

      const user = this.getUser();
      const params = {
        query: 'subject:' + this.category,
        orderBy: 'newest',
      }

      if(user){
        const profile = await axios
          .get(`profiles/${user.uid}`)
          .then(response => response.data);

        params.lang = profile.language;
      }

      axios
        .get(`books?` + httpUtils.paramsToUrlQuery(params))
        .then( res => {
          this.books = res.data.items;
        })
        .catch( err => {
          console.error(err);
        });
    }
  },

  mounted(){

    const category = categories.categories[this.category.toLowerCase()];

    this.fetchBooks();

    this.imageUri = category?.imageUri ?? `https://source.unsplash.com/250x350/?${this.category}`;
    this.imageUriMobile = category?.imageUriMobile ?? `https://source.unsplash.com/350x250/?${this.category}`;
    this.bgSolidColor = category?.color ?? '#cccccc';
    this.bgColor = `linear-gradient(90deg, ${this.bgSolidColor}44 0%, ${this.bgSolidColor}aa 75%, ${this.bgSolidColor}ff 100%);`;
    this.bgColorMobile = `linear-gradient(180deg, ${this.bgSolidColor}44 0%, ${this.bgSolidColor}aa 75%, ${this.bgSolidColor}ff 100%);`;
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
  .books-row {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    border-radius: 10px;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;

    .col {
      display: inline-block;
    }
  }
}

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

.dark-overlay{
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
}

  @media screen and (min-width: 1000px) {

    .line-header-mobile{
      display: none;
    }

    .line-header {
      position: relative;
      display: inline-block;
      width: 250px;
      padding-left: 0;
      background-color: #fff;

      img {
        display: inline-block;
        width: 250px;
        
        border-radius: 10px 0 0 10px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .line-header{
      display: none;
    }

    .books-row {
      border-radius: 0 0 10px 10px!important;
    }

    .line-header-mobile{
      display: block;
      height: 30vh;

      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      div{
        height: 100%;
      }

      .title-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>