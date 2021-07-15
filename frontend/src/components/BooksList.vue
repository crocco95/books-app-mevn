<template>

    <div class='row' v-if='!getBooks().items'>
        <div class='col-md-12'>
            <div class='alert alert-info'>
                <strong>Hei!</strong> Write the title of the book you are searching for or part of it inside the search
                bar to start
            </div>
        </div>
    </div>

    <div class='row'>
        <div
            class='col-md-4 col-sm-6 col-6 mb-4'
            v-for='book in getBooks().items'
            :key='book.id'>

            <BookPreviewCard
                :id='book.id'
                :coverUrl='book?.volumeInfo?.imageLinks?.thumbnail'
                :title='book.volumeInfo.title'
                :subtitle='book.volumeInfo.subtitle'
                :description='book.volumeInfo.description'
                :authors='book.volumeInfo.authors' />
        </div>

        <div class='row mt-4 pb-5' v-if='!areBooksFinished()'>
            <div class='col-md-8 offset-md-2'>
                <button
                    class='btn btn-outline-primary'
                    v-on:click='loadMore()'>
                    ➕Load more results
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import BookPreviewCard from './BookPreviewCard.vue'

export default {
    components: { BookPreviewCard },

    methods: {

        ...mapGetters(['getBooks', 'getLastSearch', 'areBooksFinished']),
        ...mapActions(['loadMoreBooks']),

        async loadMore() {
            const books = await this.getBooks();
            const lastSearch = await this.getLastSearch();

            await this.loadMoreBooks({ books, lastSearch });
        }
    },
}
</script>