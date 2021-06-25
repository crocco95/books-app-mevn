<template>
  <router-link :to="`/books/${id}`" class="card book-preview-card">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="coverUrl ?? `https://eu.ui-avatars.com/api/?size=150&name=${title}`" class="w-100 book-cover" alt="Cover">
      </div>
      <div class="col-md-8 right-side">
        <div class="card-body">
          <h5 class="card-title">
            {{ title && title.length > 50 ? title.substr(0, 50) + '...' : title }}
          </h5>
          <p class="card-text text-written-by">
            <small class="text-muted">{{ authors?.join() }}</small>
          </p>
        </div>
      </div>
    </div>
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

<style lang="scss" scoped>

  .book-preview-card{
    height: 100%;
    border: none;
    border-radius: 1rem;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

    text-decoration: none;

    transition: all .3s;

    .card-title{
      color: #333;
    }

    .card-title, .text-written-by{
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .right-side {
      text-align: left;
      padding-left: 1rem;
    }

    .book-cover{
      border-radius: 1rem;
    }
  }

  .book-preview-card:hover{
    box-shadow: 0 2px 10px 1px rgb(64 60 67 / 80%);
  }

</style>