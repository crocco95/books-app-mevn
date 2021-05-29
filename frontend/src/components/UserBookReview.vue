<template>
  <div class="review mt-1 text-start">
    <div class="row review-header">
        
        <!-- Title + Author -->
        <div class="col-md-6 col-6">
          <h3 v-text="title" class="d-inline"></h3>
          <small class="mx-2" v-if="author">by <router-link v-text="author.name" :to="`/profiles/${author._id}`"></router-link></small>
        </div>

        <!-- Edit button -->
        <div class="col-md-6 col-6 text-end">
          <button v-if="editButtonVisible" class="btn btn-sm btn-primary">Edit</button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="row">
        <div class="col-md-12">
          <LongText :text="description" :max="255" />
        </div>
      </div>

      <hr/>
      
      <!-- Vote -->
      <div class="row">
        <div class="col-md-12">
          <p>
            Vote: <strong>{{ vote }}/5</strong>
          </p>
        </div>
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
      editButtonVisible: false
    }
  },

  methods: {
    async fetchUserDetails(){
      return axios
        .get(`http://localhost:8080/api/v1/profiles/${this.userId}`)
        .then( res => this.author = res.data)
        .catch( err => {
          console.error( err.response.data );
        });
    }
  },

  mounted(){
    this.fetchUserDetails()
    .then( author => {
      this.editButtonVisible = author._id === this.userId;
    });
  }
}
</script>

<style>

</style>