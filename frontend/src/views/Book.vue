<template>
  <div class="container book">
    <BookCompleteInfo :id="id"/>
    
  </div>
</template>

<script>

import BookCompleteInfo from '@/components/BookCompleteInfo.vue'

export default {
  name: 'Book',

  components: {
    BookCompleteInfo
  },

  props: {
    id: String
  },

  data(){
    return {
      bookId: false
    }
  },

  mounted(){
    this.bookId = this.$route.params.id;
  }
}
</script>