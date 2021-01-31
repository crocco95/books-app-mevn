<template>
  <div class="book-preview-card">
    <div :style="'background-image:url('+ coverUrl + ')'" class="cover"></div>
    <h4 v-text="title" class="title mt-2"></h4>
    <p v-text="description" class="description"></p>
  </div>
</template>

<script>
export default {
  props:{
    coverUrl: String,
    title: String,
    description: String
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

    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .description {
    padding: 0 1rem;
    height: 6rem;
    text-align: justify;
    overflow: hidden;
  }
</style>