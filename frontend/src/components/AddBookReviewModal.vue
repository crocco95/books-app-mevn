<template>
  
  <div>
    <!-- START Modal -->
    <div class="modal fade" :id="(review ? 'edit' : 'add') + 'ReviewModal'" tabindex="-1" :aria-labelledby="review ? 'edit' : 'add' + 'ReviewModalLabel'" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="(review ? 'edit' : 'add') + 'ReviewModalLabel'">{{ review ? "Edit" : "Add" }} review</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="text-start" v-if="!success">
              <!-- START Review title -->
              <div class="mb-3">
                <label for="review-title" class="col-form-label">Title</label>
                <input type="text" class="form-control" id="review-title" placeholder="The title" v-model="title">
              </div>
              <!-- END Review title -->

              <!-- START Review description -->
              <div class="mb-3">
                <label for="review-text" class="col-form-label">Description</label>
                <textarea class="form-control" id="review-text" placeholder="Write here what you think about this book" rows="5" v-model="description"></textarea>
              </div>
              <!-- END Review description -->

              <!-- START Review vote -->
              <div class="mb-3">
                <label for="review-vote" class="col-form-label">Your vote: <strong>{{ vote }}/5</strong></label>
                <input type="range" min="1" max="5" class="form-range" id="review-vote" v-model="vote">
              </div>
              <!-- END Review vote -->
            </form>

            <div class="row" v-if="error">
              <div class="col-md-12">
                <div class="alert alert-danger">
                  <strong>Error:</strong> {{ error.message }}
                </div>
              </div>
            </div>

            <div class="row" v-if="success">
              <div class="col-md-12">
                <div class="alert alert-success">
                  <strong>Done!</strong> {{ success.message }}
                </div>
              </div>
            </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addReview" v-if="!success && !review">Send review</button>
            <button type="button" class="btn btn-primary" @click="editReview" v-if="!success && review">Edit review</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END Modal -->
  </div>

</template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';

export default {

  props:{
    bookId: String,
    review: Object
  },

  data(){
    return {
      title: '',
      description: '',
      vote: 3,
      isLoading: false,
      error: '',
      success: ''
    }
  },

  mounted() {
    if(this.review){
      this.title = this.review.title;
      this.description = this.review.description;
      this.vote = this.review.vote;
    }
  },

  methods: {

    ...mapGetters(['getIdToken']),

    addReview( event ){

      event.preventDefault();

      this.isLoading = true;

      axios.post(`http://localhost:8080/api/v1/books/${this.bookId}/reviews`,{
        title: this.title,
        description: this.description,
        vote: this.vote,
      },{
        headers:{
          'Authorization': window.localStorage.getItem('_token'),
        }
      })
      .then( book => {
        this.error = '';
        this.success = {message:'Review added successfully!'};
      })
      .catch( err => {
        console.error(err.response);
        this.success = '';
        this.error = err.response.data;
      })
      .finally(() => {
        this.isLoading = false;
      });
    },

    editReview(){
      axios.put(`http://localhost:8080/api/v1/books/${this.bookId}/reviews/${this.review._id}`,{
        title: this.title,
        description: this.description,
        vote: this.vote,
      },{
        headers:{
          'Authorization': this.getIdToken(),
        }
      })
      .then( review => {

        this.title = review.data.title;
        this.description = review.data.description;
        this.vote = review.data.vote;

        this.error = '';
        this.success = {message:'Review edited successfully!'};
      })
      .catch( err => {
        console.error(err.response);
        this.success = '';
        this.error = err.response.data;
      })
      .finally(() => {
        this.isLoading = false;
      });
    }
  }
}
</script>

<style>

</style>