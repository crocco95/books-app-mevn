<template>
  <div class="search">
    <h1>Search</h1>
    <input type="text" placeholder="Search something like 'Biancaneve', 'Divina Commedia', etc..."/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .search{
    text-align: left;
  }

  .search > input {
      display: block;
      width: 100%;
      margin: 0 auto;
      padding: 1rem;

      border-radius: 1rem;
      border: none;
      box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    }
</style>