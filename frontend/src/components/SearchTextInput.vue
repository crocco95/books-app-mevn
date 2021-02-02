<template>
  <div class="search">
    <small v-if="totalResults">Sono stati trovati {{ totalResults }} risultati</small>
    <form class="input-group mb-3" @submit="search">
      <input type="text"
        class="form-control"
        placeholder="Search something like 'Harry Potter'"
        aria-label="Example text with button addon"
        aria-describedby="button-search"
        :disabled="searchingFlag"
        v-model="query"/>

      <button class="btn btn-white"
        type="submit"
        id="button-search"
        :disabled="searchingFlag">
        
          <span v-if="!searchingFlag">Let's Go!</span>
          <span v-else>Searching...</span>

        </button>
    </form>

  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  data() {
    return {
      searchingFlag: false,
      query: '',
      totalResults: false,
      results: []
    }
  },

  methods: {

    ...mapActions(['fetchBooks']),
    
    search: function( event ){

      // Prevent the submit event
      event.preventDefault();

      // If the query is empty, don't continue
      if( !this.query ){
        alert("You must write something to search!");
        return;
      }

      this.searchingFlag = true;

      // Perform the request
      this.fetchBooks({
        query: this.query,
        limit: 12,
      }).then( () => {
        this.searchingFlag = false;
      });
    },
  }
}
</script>

<style scoped>
  .search{
    text-align: left;
  }

  .search input {
      display: inline-block;
      width: auto;
      margin: 0 auto;
      padding: 1rem;

      border-radius: 1rem;
      border: none;
      box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    }

    button{
      display: inline-block;
      box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    }
</style>