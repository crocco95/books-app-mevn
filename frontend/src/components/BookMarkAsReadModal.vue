<template>
  
  <div>
    <!-- START Modal -->
    <div class="modal fade" :id="'bookMarkModal' + bookId" tabindex="-1" :aria-labelledby="'bookMarkModalLabel' + bookId" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="'bookMarkModalLabel' + bookId">Mark book as read or in reading</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="text-start" v-if="!success">
              <!-- START Start date -->
              <div class="mb-3">
                <label for="date-start" class="col-form-label">Start reading date (if you remember)</label>
                <input type="date" class="form-control" id="date-start" v-model="startDate">
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
                <input type="date" class="form-control" id="date-end" v-model="finishDate">
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
            <button type="button" class="btn btn-primary" @click="newBookReadFlag ? add() : edit()" v-if="!success">Save</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END Modal -->
  </div>

</template>

<script>

import {mapGetters} from 'vuex';
import axios from 'axios';

export default {

  props:{
    bookId: String,
    totalPages: Number,
  },

  data(){
    return {
      startDate: '',
      finishDate: '',
      currentPage: 0,
      finishedFlag: false,
      newBookReadFlag: true,
      success: '',
      error: '',
    }
  },

  methods: {

    ...mapGetters(['getUser', 'isLogged']),

    fetch(){

      const userId = this.getUser()?.uid;

      axios.get(`http://localhost:8080/api/v1/books/${this.bookId}/read/${userId}`)
      .then( res => {
        if( res.data ){
          this.startDate = res.data.startDate.split('T')[0];
          this.finishDate = res.data.finishDate?.split('T')[0];
          this.finishedFlag = this.finishDate ? true : false;
          this.currentPage = res.data.currentPage;
          this.newBookReadFlag = false;
        }
      })
      .catch( err => console.error(err));
    },
    
    add(){
      const userId = this.getUser()?.uid;

      axios.post(`http://localhost:8080/api/v1/books/${this.bookId}/read`,{
        userId,
        currentPage: this.finishDate ? null : this.currentPage,
        startDate: this.startDate,
        finishDate: this.finishDate,
      })
      .then( res => {
        this.success = {
          message: "Saved successfully!",
          code: res.status
        };
        this.error = '';
      })
      .catch( err => this.error = err.response.data);
    },

    edit(){
      axios.put(`http://localhost:8080/api/v1/books/${this.bookId}/read`,{
        currentPage: this.finishDate ? null : this.currentPage,
        startDate: this.startDate,
        finishDate: this.finishDate,
      })
      .then( res => {
        this.success = {
          message: "Edited successfully!",
          code: res.status
        };
        this.error = '';
      })
      .catch( err => this.error = err.response.data);
    }
  },

  mounted(){
    if(this.isLogged()){
      this.fetch();
    }
  },
}
</script>

<style>

</style>