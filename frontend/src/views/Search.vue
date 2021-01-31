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

    <div class="row">
      <div class="col-md-8 offset-md-2">

        <div class="row">
          <div class="col-md-4 mt-4">
            <BookPreviewCard :title="title" :description="description"/>
          </div>
        </div>
      
      </div>
    </div>

  </div>
</template>

<script>

import SearchTextInput from '@/components/SearchTextInput.vue'
import BookPreviewCard from '@/components/BookPreviewCard.vue'

export default {
  components: {
    SearchTextInput,
    BookPreviewCard
  },

  data(){
    return{
      title: "Test",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  }
}
</script>

<style scoped>
  h1{
    text-align: left;
  }
</style>