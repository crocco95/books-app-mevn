<template>
  <div class="review mt-1 mb-1 text-start">
    <div class="row review-header">
        
        <!-- Title + Author -->
        <div class="col-md-6 col-6">
          <h3 v-text="review.title" class="d-inline"></h3>
          <small class="mx-2" v-if="author">by <router-link v-text="author.name" :to="`/profiles/${author._id}`"></router-link></small>
        </div>

        <!-- Edit button -->
        <div class="col-md-6 col-6 text-end">
          <AddBookReviewModal :bookId="review.bookId" :review="review"/>
          <button
            v-if="sameLoggedUserFlag"
            class="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#editReviewModal">Edit</button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="row">
        <div class="col-md-12">
          <LongText :text="review.description" :max="255" />
        </div>
      </div>

      <hr/>
      
      <!-- Vote -->
      <div class="row">
        <div class="col-md-12">
          <p>
            Vote: <strong>{{ review.vote }}/5</strong>
          </p>
        </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios';
import LongText from '@/components/LongText';
import AddBookReviewModal from '@/components/AddBookReviewModal';
import { mapGetters } from 'vuex';

export default {
  components: {
    LongText,
    AddBookReviewModal,
  },

  props: {
    review: Object,
  },

  data(){
    return {
      author: '',
      sameLoggedUserFlag: false
    }
  },

  methods: {

    ...mapGetters(['getUser']),

    async fetchUserDetails(){
      return axios
        .get(`/profiles/${this.review.userId}`)
        .then( res => this.author = res.data)
        .catch( err => {
          console.error( err.response.data );
        });
    }
  },

  mounted(){
    this.fetchUserDetails()
    .then( author => {
      this.sameLoggedUserFlag = (author._id === this.getUser().uid);
    });
  }
}
</script>

<style>

</style>