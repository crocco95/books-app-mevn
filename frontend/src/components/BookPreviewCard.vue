<template>
  <div class="card book-preview-card">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="coverUrl" alt="Cover">
      </div>
      <div class="col-md-8 right-side">
        <div class="card-body">
          <h5 class="card-title">
            {{ title && title.length > 50 ? title.substr(0, 50) + '...' : title }}
          </h5>
          <!-- <p class="card-text description">{{ description && description.length > 100 ? description.substr(0, 100) + '...' : description }}</p> -->
          <p class="card-text">
            <small class="text-muted">Writter by {{ authors?.join() }}</small>
          </p>

          <router-link :to="'/books/' + id">Approfondisci</router-link>
        </div>
      </div>
    </div>
  </div>
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

    .card-title{
      color: #333;
    }

    .right-side {
      text-align: left;
      padding-left: 1rem;
    }
  }

</style>