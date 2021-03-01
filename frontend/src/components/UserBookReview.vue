<template>
  <div class="row review my-1">
    <div class="col-md-12 text-start">
      <div class="review-header">
        <h3 v-text="title" class="d-inline"></h3>
        <small class="mx-2" v-if="author">by <router-link v-text="author.name" :to="`/profiles/${author._id}`"></router-link></small>
      </div>
      <LongText :text="description" :max="255" />
      <hr/>
      <p>
        Vote: <strong>{{ vote }}/5</strong>
      </p>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
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
    userId: String,
  },

  data(){
    return {
      author: '',
    }
  },

  methods: {
    fetchUserDetails(){
      axios
        .get(`http://localhost:3000/api/v1/profiles/${this.userId}`)
        .then( res => {
          this.author = res.data;
        })
        .catch( err => {
          console.error( err.response.data );
        });
    }
  },

  mounted(){
    this.fetchUserDetails();
  }
}
</script>

<style>

</style>