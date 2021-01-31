<template>
  <div class="search">
    <small v-if="totalResults">Sono stati trovati {{ totalResults }} risultati</small>
    <form class="input-group mb-3" @submit="search">
      <input type="text"
        class="form-control"
        placeholder="Search something like 'Harry Potter'"
        aria-label="Example text with button addon"
        aria-describedby="button-search" v-model="query"/>

      <button class="btn btn-white"
        type="submit"
        id="button-search">Search</button>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      totalResults: false,
      results: []
    }
  },

  methods: {
    search: function(event) {

      // Prevent the submit event
      event.preventDefault();

      // If the query is empty, don't continue
      if( !this.query ){
        alert("You must write something to search!");
        return;
      }

      // Perform the request
      fetch('http://localhost:3000/api/v1/books?query='.concat(this.query),{
        method: 'GET'
      })
      .then( res => res.json())
      .then( data => {
        console.log(data);
        this.totalResults = data.totalItems;
        this.results = data.items;
      })
      .catch( err => console.error(err));
    }
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