<template>
  <div class="container-static-carousel">
    <div id="home-hero-carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">

        <button
          v-for="slide in slides" :key="slide.id"
          type="button"
          data-bs-target="#home-hero-carousel"
          :data-bs-slide-to="slide.id"
          :class="slide.id <= 0 ? 'active' : ''"
          aria-current="true"
          :aria-label="`Slide ${slide.id}`"></button>
      </div>
      <div class="carousel-inner">
        
        <div :class="'carousel-item ' + (slide.id <= 0 ? 'active' : '')" v-for="slide in slides" :key="slide.id">
          <img :src="slide.imageUri" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h1 class="text-uppercase fw-bolder" v-text="slide.title"></h1>
            <p v-text="slide.description"></p>
            <router-link  class="btn btn-primary"
              v-for="button in slide.buttons" :key="button.id"
              v-text="button.title"
              :to="button.uri"
              v-on:click="prepareSearch(slide.title)"></router-link>
          </div>
        </div>
        
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#home-hero-carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#home-hero-carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import axios from 'axios';

export default {

  data(){
    return {
      slides: [],
    }
  },

  methods:{

    ...mapGetters(['getUser']),
    ...mapActions(['fetchBooks']),

    getPreferences(){

      const user = this.getUser();

      return axios
        .get(`user_preferences/${user.uid}/preferences`)
        .then( res => res.data )
    },

    prepareSearch(category){
      this.fetchBooks({
        query: `subject=${category}&orderBy=newest`,
        limit: 12,
      }).then( () => {
        this.searchingFlag = false;
      });
    }
  },

  async mounted(){
    const preferences = await this.getPreferences();
    
    for(let i = 0 ; i < 4 && i < Object.keys(preferences.categories).length; i++ ){

      let category = Object.keys(preferences.categories)[i];

      this.slides.push({
        id: i,
        title: category,
        description: "Explore your preferences, here some ideas for you!",
        imageUri: `https://source.unsplash.com/1920x1080/?${category}`,
        buttons: [
          {
            id: 0,
            title: '🔝 Discover the newest releases',
            uri: '/search',
          },
        ]
      });
    }
  }
}
</script>
<style lang="scss" scoped>

  .container-static-carousel{
    border-radius: 0 0 1rem 1rem;
  }

  .carousel-caption{
    background-color: rgba(0,0,0,.4);
    padding: 2rem 1rem;
  }
  .carousel-item{
    max-height: 80vh;
  }
</style>