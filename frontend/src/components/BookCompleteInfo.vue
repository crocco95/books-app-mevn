<template>
  <small>ID: {{ id }}</small>
  <h1 v-text="title"></h1>
  <p v-text="description" class="description"></p>
</template>

<script>
export default {

  name: 'BookCompleteInfo',

  props: {
    id: String
  },

  data() {
    return {
      coverUrl: '',
      title: '',
      description: '',
      releaseDate: ''
    }
  },
}
</script>