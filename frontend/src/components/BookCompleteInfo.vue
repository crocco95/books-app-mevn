<template>
  <div class="row book">
    <div class="col-md-8 offset-md-2">
      <h1 class="mt-4" v-text="volumeInfo.title"></h1>

      <div class="row mt-5">
        <div class="col-md-4 col-sm-12">
          <img :src="coverUrl" alt="Book's cover" class="cover float-md-start"/>
        </div>
        <div class="col-md-4 col-sm-6 text-md-start">
          <h3>Author<span v-if="volumeInfo && volumeInfo.authors.length > 1">s</span></h3>
          <ul class="authors-list">
            <li v-for="author in volumeInfo.authors">{{ author }}</li>
          </ul>
        </div>
        <div class="col-md-4 col-sm-6">
          <h3>Rating</h3>
          <div class="row">
            
            <!-- START Internal rating -->
            <div class="col-md" v-if="internalReviewsSummary?.avg">
              <h4>Internal</h4>
              <div class="review-vote py-1">
                <h5 class="fw-bolder my-0">
                  {{ Math.round(internalReviewsSummary?.avg * 100) / 100 }}<small class="fw-normal"> / 5</small>
                </h5>
              </div>
              <small>{{ internalReviewsSummary.total }} reviews</small>
            </div>
            <!-- STOP Internal rating -->
            
            <!-- START Google rating -->
            <div class="col-md" v-if="volumeInfo.averageRating">
              <h4>Google</h4>
              <div class="review-vote py-1">
                <h5 class="fw-bolder my-0">
                  {{ volumeInfo.averageRating }}<small class="fw-normal"> / 5</small>
                </h5>
              </div>
              <small>{{ volumeInfo.ratingsCount }} reviews</small>
            </div>
            <!-- STOP Google rating -->

          </div>
        </div>
      </div>

      <!-- START Links -->
      <div class="row mt-3">
        <div class="col-md my-1">
          <a :href="volumeInfo.previewLink" class="btn btn-outline-primary w-100" target="_blank">Read preview</a>
        </div>
        <div class="col-md my-1" v-if="saleInfo.buyLink">
          <a :href="saleInfo.buyLink" class="btn btn-primary w-100" target="_blank">Buy it now</a>
        </div>
        <div class="col-md my-1">
          <BookMarkAsReadModal
            :bookId="id"
            :totalPages="volumeInfo.printedPageCount"
            v-if="isLogged()"/>

          <button class="btn btn-primary w-100"
            data-bs-toggle="modal"
            :data-bs-target="'#bookMarkModal' + id"
            :disabled="!isLogged()">
            <span v-if="!isLogged()">🔒</span>Mark book as read or in reading
          </button>          
        </div>
      </div>
      <!-- END Links -->

      <!-- START Description -->
      <div class="row mt-5">
        <div class="clearfix">
          <LongText :text="volumeInfo.description" :max="400" v-if="volumeInfo" class="description" />
        </div>
      </div>
      <!-- END Description -->

      <div class="row my-3">
        <div class="col-md-6 text-start">
          <h2>Users reviews</h2>
        </div>
        <div class="col-md-6">
          <AddBookReviewModal :bookId="id" v-if="isLogged()"/>
          <button
            class="btn btn-primary w-100"
            data-bs-toggle="modal"
            data-bs-target="#addReviewModal"
            :disabled="!isLogged()">
            <span v-if="!isLogged()">🔒</span>Write a Review</button>
        </div>
      </div>

      <div class="row my-3" v-if="reviews.length <= 0">
        <div class="col-md-12">
          <div class="alert alert-info">
            <strong>Hei!</strong> Nobody wrote a review for this book, be the first one!
          </div>
        </div>
      </div>

      <UserBookReview v-for="review in reviews"
      :key="review._id"
      :review="review"/>

    </div>
  </div>
</template>

<script>

import axios from 'axios';
import AddBookReviewModal from '../components/AddBookReviewModal';
import LongText from '@/components/LongText';
import BookMarkAsReadModal from '@/components/BookMarkAsReadModal';
import UserBookReview from '@/components/UserBookReview';
import { mapGetters } from 'vuex';

export default {

  name: 'BookCompleteInfo',

  components: {
    AddBookReviewModal,
    LongText,
    BookMarkAsReadModal,
    UserBookReview,
  },

  props: {
    id: String
  },

  data() {
    return {
      coverUrl: '',
      volumeInfo: '',
      saleInfo: '',
      reviews: [],
      internalReviewsSummary: '',
    }
  },

  methods: {

    ...mapGetters(['isLogged']),

    /**
     * Fetch all data related to the current book
     */
    fetchData(){
      axios
        .get(`books/${this.id}?projection=full`)
        .then( res => {

          const book = res.data;

          this.coverUrl = book.volumeInfo.imageLinks?.thumbnail;

          this.volumeInfo = book.volumeInfo;
          this.saleInfo = book.saleInfo;
        })
        .catch( err => {
          console.error( err );
        });
    },

    /**
     * Fetch all the reviews
     */
    fetchReviews(){
      axios
        .get(`books/${this.id}/reviews`)
        .then( res => {
          this.reviews = res.data;
        })
        .catch( err => {
          console.error( err );
        });
    },

    /**
     * Fetch the average rating based on internal software reviews
     */
    fetchAverageInternalReviews(){
      axios
        .get(`books/${this.id}/reviews/average`)
        .then( res => {
          this.internalReviewsSummary = res.data[0];
        })
        .catch( err => {
          console.error( err );
        });
    }
  },

  mounted(){
    this.fetchData();
    this.fetchReviews();
    this.fetchAverageInternalReviews();
  }
}
</script>

<style lang="scss" scoped>

  img.cover{
    margin: 0 25px 0 0;
  }

  .description{
    text-align: justify;
  }

  .review{
    background-color: #ececec;
    padding: 1rem;
    border-radius: 1rem;
  }

  ul.authors-list{

    padding-left: 0;
    
    li::before{
      content: '✍️ ';
    }

    li{
      list-style: none;
    }
  }
  
</style>