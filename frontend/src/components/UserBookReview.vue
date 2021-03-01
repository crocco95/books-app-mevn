<template>
  <div class="row review my-1">
    <div class="col-md-12 text-start">
      <h3 v-text="title"></h3>
      <LongText :text="description" :max="255" />
      <hr/>
      <p>
        Vote: <strong>{{ vote }}/5</strong>
      </p>
    </div>
  </div>
</template>

<script>

import LongText from '@/components/LongText';

export default {
  components: {
    LongText
  },

  props: {
    bookId: String,
    title: String,
    vote: Number,
    description: String,
  },
}
</script>

<style>

</style>