<template>
  <div class="container-fluid">
    <div class="row search-bar-container">
      <div class="col-md-8 offset-md-2">
        <h1 class="fw-bolder">Search</h1>
        <SearchTextInput />

        <small class="tip text-secondary">
          <strong>Tip:</strong> Are you searching for a person? Put the "@" in the search bar before her username!
        </small>
      </div>
    </div>


    <div class="row mt-4">
      <div class="col-md-8 offset-md-2">
        <BooksList />
      </div>
    </div>

  </div>
</template>

<script>

import SearchTextInput from '@/components/SearchTextInput.vue'
import BooksList from '@/components/BooksList.vue'

export default {
  components: {
    SearchTextInput,
    BooksList
  },
}
</script>

<style scoped>
  h1{
    text-align: left;
  }

  .search-bar-container {
    background-image: url('../assets/bg_search.jpg');
    background-position: center;
    background-size: cover;
    /* background-attachment: fixed; */ /* Great visual impact but not so much usefull here... */

    padding: 20vh 0;
  }

  .tip {
    padding: 10px 20px;
    border-radius: 100rem;
    background-color: rgba(255, 255, 255, .8);
  }
</style>