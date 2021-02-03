<template>
  <router-link :to="'/books/' + id" class="book-preview-card">
    <div :style="'background-image:url('+ coverUrl + ')'" class="cover"></div>
    <h4 v-text="title" class="title mt-2 mb-0"></h4>
    
    <div v-if="authors !== undefined" class="authors">
      <small class="text-secondary">By </small>
      <small class="text-secondary">{{ authors.join() }}</small>
    </div>

    <p v-text="description" class="description mt-3"></p>
  </router-link>
</template>

<script>
export default {
  props:{
    id: String,
    coverUrl: String,
    title: String,
    subtitle: String,
    description: String,
    authors: Array
  }
}
</script>

<style scoped>

  .book-preview-card{

    display: block;
    width: 100%;
    height: 100%;

    border-radius: 1rem;
    border: none;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

    text-decoration: none;
  }

  .cover {
    display: block;
    height: 8rem;
    
    background-color: #666;
    background-position: center;
    background-size: cover;

    border-radius: 1rem 1rem 0 0;
  }

  .title {
    display: -webkit-box;
    
    padding: 0 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333;

    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .description {
    padding: 0 1rem;
    height: 6rem;
    text-align: justify;
    overflow: hidden;

    color: #333;
  }
</style>