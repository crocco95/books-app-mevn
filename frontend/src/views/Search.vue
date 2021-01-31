<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1>Search</h1>
        <SearchTextInput />
      </div>
      <small class="text-secondary">
        <strong>Tip:</strong> Are you searching for a person? Put the "@" in the search bar before her username!
      </small>
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
import BooksList from '../components/BooksList.vue'

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
</style>