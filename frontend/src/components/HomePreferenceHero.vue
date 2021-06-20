<template>
  <div id="home-hero-carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">

      <button
        v-for="slide in slides" :key="slide.id"
        type="button"
        data-bs-target="#home-hero-carousel"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"></button>
    </div>
    <div class="carousel-inner">
      
      <div class="carousel-item active" v-for="slide in slides" :key="slide.id">
        <img src="" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
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
</template>
<script>

import { mapGetters } from 'vuex'
import axios from 'axios';

export default {

  data(){
    return {
      slides: [],
    }
  },

  methods:{

    ...mapGetters(['getUser']),

    getPreferences(){

      const user = this.getUser();

      axios
        .get(`http://localhost:8080/api/v1/users/${user.uid}/preferences`)
    }
  },

  mounted() {
    const user = this.getPreferences();
    console.log(user);
  }
}
</script>