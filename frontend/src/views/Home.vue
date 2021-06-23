<template>
  <div class="home">
    <div class="container-fluid">
      <HomePreferenceHero v-if="getUser()" />
      <HomeStaticHero v-else />
    </div>
    <div class="container">
      <div v-if="readyFlag">
        <LatestBooks v-for="category in categories" :key="categories.indexOf(category)" :category="category" limit="12" class="mt-5"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import availableCategories from '../config/available_categories' 
  import HomeStaticHero from '@/components/HomeStaticHero.vue';
  import HomePreferenceHero from '@/components/HomePreferenceHero.vue';
  import LatestBooks from '@/components/LatestBooks.vue';
  import MostReadBooks from '@/components/MostReadBooks.vue';
  import PageLoader from '@/components/PageLoader.vue';

  import {mapGetters} from 'vuex';

  export default {
    name: 'Home',
    components: {
      HomeStaticHero,
      HomePreferenceHero,
      LatestBooks,
      MostReadBooks,
      PageLoader,
    },

    data() {
      return {
        categories: [],
        readyFlag: false,
      };
    },

    methods:{
      ...mapGetters(['getUser', 'isLogged']),

      async getPreferences(){

        const user = this.getUser();

        return axios
          .get(`/user_preferences/${user.uid}/preferences`)
          .then( response => response.data.categories);
      }
    },

    async mounted(){
      const user = this.getUser();

      if(user){
        await this.getPreferences()
          .then( preferences => {
            this.categories = Object.keys(preferences);
          });
      }

      for(let i = this.categories.length ; i < 10 ; i++){
        
        const c = availableCategories.categories[Math.floor(Math.random()*availableCategories.categories.length)];
        
        if(this.categories.indexOf(c) === -1){
          this.categories.push(c);
        }
      }
      
      this.readyFlag = true;
    }
  }
</script>

<style scoped>

</style>
