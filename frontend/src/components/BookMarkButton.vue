<template>
  
  <div>
    <!-- START Modal -->
    <div class="modal fade" id="bookMarkModal" tabindex="-1" aria-labelledby="bookMarkModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="bookMarkModalLabel">Mark book as read or in reading</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="text-start" v-if="!success">
              <!-- START Start date -->
              <div class="mb-3">
                <label for="date-start" class="col-form-label">Start reading date (if you remember)</label>
                <input type="date" class="form-control" id="date-start" v-model="dateStart">
              </div>
              <!-- END Start date -->

              <!-- START Current page -->
              <div class="mb-3" v-if="!finishedFlag">
                <label for="review-vote" class="col-form-label">Current page: <strong>{{ currentPage }}/{{ totalPages }}</strong> ({{ parseInt(currentPage * 100 / totalPages) }}%)</label>
                <input type="range" min="0" :max="totalPages" class="form-range" id="review-vote" v-model="currentPage">
              </div>
              <!-- END Current page -->

              <!-- START Current page -->
              <div class="mb-3">
                <input type="checkbox" class="form-checkbox" id="finished-flag" v-model="finishedFlag">
                <label for="finished-flag" class="col-form-label px-1">I have already finished this book</label>
              </div>
              <!-- END Current page -->

              <!-- START End date -->
              <div class="mb-3" v-if="finishedFlag">
                <label for="date-end" class="col-form-label">End reading date</label>
                <input type="date" class="form-control" id="date-end" v-model="dateEnd">
              </div>
              <!-- END End date -->

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
            <button type="button" class="btn btn-primary" @click="add" v-if="!success">Send review</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END Modal -->

    <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#bookMarkModal">Mark book as read or in reading</button>
  </div>

</template>

<script>

import axios from 'axios';

export default {

  props:{
    bookId: String,
    totalPages: Number,
  },

  data(){
    return {
      dateStart: '',
      dateEnd: '',
      currentPage: 0,
      finishedFlag: false,
      success: '',
      error: '',
      authenticatedUserFlag: window.localStorage.getItem('_token')
    }
  },

  methods: {
    add(){
      axios.post(`http://localhost:3000/api/v1/users/me/books`,{
        bookId: this.bookId,
        currentPage: this.currentPage,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
      },{
        headers:{
          'Authorization': window.localStorage.getItem('_token')
        }
      })
      .then( res => {
        console.log(res);
        this.success = "Saved successfully!";
      })
      .catch( err => this.error = err.response.data);
    }
  }
}
</script>

<style>

</style>