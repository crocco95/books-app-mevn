<template>
  <div class="row">

    <div class="col-md-12 text-center" v-if="books.length <= 0">
      <span class="text-secondary">No activities yet :(</span>
    </div>

    <div class="col-md-4 mt-4" v-for="book in books" :key="book._id">
      <div class="card book-read-card">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="book.coverUrl" alt="Cover">
          </div>
          <div class="col-md-8 right-side">
            <div class="card-body">
              <h5 class="card-title text-start">
                {{ book.title && book.title.length > 50 ? book.title.substr(0, 50) + '...' : book.title }}
              </h5>

              <div class="text-start">
                <p class="mb-1" v-if="book.startDate">Started at <strong>{{ formatDate(book.startDate) }}</strong></p>
                <p class="mb-1" v-if="book.finishDate">Finished at <strong>{{ formatDate(book.finishDate) }}</strong></p>
              </div>

              <div v-if="!book.finishDate">
                <div v-if="book.totalPages" class="text-start mt-3">
                  <span>Progress:</span>
                  <div class="progress">
                    <div class="progress-bar bg-success"
                      role="progressbar"
                      :style="`width: ${parseInt((book.currentPage * 100) / book.totalPages)}%`"
                      :aria-valuenow="parseInt((book.currentPage * 100) / book.totalPages)"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
              </div>

              <div class="text-end">
                <BookMarkAsReadModal :bookId="book.bookId" :totalPages="book.totalPages"/>
                
                <router-link :to="'/books/' + book.bookId" class="btn btn-link text-primary">Read more</router-link>
                <button class="btn btn-link text-primary" data-bs-toggle="modal" :data-bs-target="'#bookMarkModal' + book.bookId">Edit</button>
                <button class="btn btn-link text-danger" @click="removeBookRead(book.bookId)">Remove</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import BookMarkAsReadModal from '@/components/BookMarkAsReadModal.vue';

export default {

  components:{
    BookMarkAsReadModal
  },

  props:{
    userId: String
  },

  data(){
    return {
      books: []
    }
  },

  methods: {

    formatDate(string){
      const date = new Date(string);
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    },

    mergeBookInfo(book){
      console.log(book);
      this.books.forEach( b => {
        if( b.bookId === book.id ){
          b.coverUrl = book.volumeInfo.imageLinks?.thumbnail;
          b.title = book.volumeInfo.title;
          b.totalPages = book.volumeInfo.printedPageCount
        }
      })
    },
    
    async fetchBook(bookId){
      return axios
        .get(`http://localhost:8080/api/v1/books/${bookId}?projection=full`)
        .then( res => res.data);
    },

    fetchBooks(){

      axios
        .get(`http://localhost:8080/api/v1/users/${this.userId}/books`)
        .then( res => {

          this.books = res.data;

          this.books.forEach( rb => {
            this.fetchBook(rb.bookId)
              .then( book => this.mergeBookInfo(book))
          })
        })
        .catch( err => console.error( err ));
        
    },

    removeBookRead(bookId){
      const userId = window.localStorage.getItem('_userId');
      const token = window.localStorage.getItem('_token');

      axios
        .delete(`http://localhost:8080/api/v1/users/${userId}/books/${bookId}`,{
          headers:{
            'Authorization': token
          }
        })
        .then( () => this.fetchBooks())
        .catch( err => console.error(err.response.data));
    },
  },

  mounted(){
    this.fetchBooks();
  }
}
</script>

<style lang="scss" scoped>
  .book-read-card{
    height: 100%;
    border: none;
    border-radius: 1rem;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

    text-decoration: none;

    img{
      border-radius: 1rem;
    }

    .progress{
      background-color: #ececec;
      height: .3rem;
    }
  }
</style>