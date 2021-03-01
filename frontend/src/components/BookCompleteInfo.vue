<template>
  <div class="row book">
    <div class="col-md-8 offset-md-2">
      <h1 class="mt-4" v-text="volumeInfo.title"></h1>

      <div class="row mt-5">
        <div class="col-md-4">
          <img :src="coverUrl" alt="Book's cover" class="cover float-md-start"/>
        </div>
        <div class="col-md-4 text-start">
          <h3>Author<span v-if="volumeInfo && volumeInfo.authors.length > 1">s</span></h3>
          <ul>
            <li v-for="author in volumeInfo.authors">{{ author }}</li>
          </ul>
        </div>
        <div class="col-md-4">
          <h3>Rating</h3>
          <div class="row">
            <div class="col-md">
              <h4 v-if="volumeInfo.averageRating">Internal</h4>
              <h5>
                5<small class="fw-normal"> / 5</small>
              </h5>
              <span>* * * * </span>
            </div>
            <div class="col-md" v-if="volumeInfo.averageRating">
              <h4>Google</h4>
              <div class="review-vote py-1">
                <h5 class="fw-bolder my-0">
                  {{ volumeInfo.averageRating }}<small class="fw-normal"> / 5</small>
                </h5>
              </div>
              <small>{{ volumeInfo.ratingsCount }} reviews</small>
            </div>
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
          <BookMarkAsReadModal :bookId="id" :totalPages="volumeInfo.printedPageCount"/>
          <button class="btn btn-primary w-100" data-bs-toggle="modal" :data-bs-target="'#bookMarkModal' + id">Mark book as read or in reading</button>
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
          <ButtonAddReview :bookId="id"/>
        </div>
      </div>

      <div class="row my-3" v-if="reviews.length <= 0">
        <div class="col-md-12">
          <div class="alert alert-info">
            <strong>Hei!</strong> Nobody wrote a review for this book, be the first one!
          </div>
        </div>
      </div>

      <div class="row review my-1" v-for="review in reviews" :key="review._id">
        <div class="col-md-12 text-start">
          <h3 v-text="review.title"></h3>
          <LongText :text="review.description" :max="255" />
          <hr/>
          <p>
            Vote: <strong>{{ review.vote }}/5</strong>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios';
import ButtonAddReview from '../components/ButtonAddReview';
import LongText from '@/components/LongText';
import BookMarkAsReadModal from '@/components/BookMarkAsReadModal';

export default {

  name: 'BookCompleteInfo',

  components: {
    ButtonAddReview,
    LongText,
    BookMarkAsReadModal,
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
    }
  },

  methods: {
    fetchData(){

      axios
        .get(`http://localhost:8080/api/v1/books/${this.id}?projection=full`)
        .then( res => {

          const book = res.data;

          console.log(book);

          this.coverUrl = book.volumeInfo.imageLinks?.thumbnail;

          this.volumeInfo = book.volumeInfo;
          this.saleInfo = book.saleInfo;
        })
        .catch( err => {
          console.error( err );
        });
    },

    fetchReviews(){
      axios
        .get(`http://localhost:8080/api/v1/books/${this.id}/reviews`)
        .then( res => {
          this.reviews = res.data;
        })
        .catch( err => {
          console.error( err );
        });
    }
  },

  mounted(){
    this.fetchData();
    this.fetchReviews();
  }
}
</script>

<style scoped>

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
</style>