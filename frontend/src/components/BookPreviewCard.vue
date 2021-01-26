<template>
  <div class="book-preview-card">
    <div style="background-image:url('{{ coverUrl }}')" class="cover"></div>
    <h3 v-text="title" class="title mt-2"></h3>
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

    display: inline-block;

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
    padding: 0 1rem;
  }

  .description {
    padding: 0 1rem;
    height: 4rem;
    text-align: justify;
    overflow: hidden;
  }
</style>