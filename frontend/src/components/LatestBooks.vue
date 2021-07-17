<template>
    <div class="latest-books" v-if="books">

        <div class="row line-header-mobile position-relative" :style="`background-image: url(${imageUriMobile})`">
            <div class="col-md-12 p-0">
                <div class="dark-overlay" :style="`background: ${bgColorMobile};`"></div>
                <div class="w-100 text-center title-container">
                    <h1 class="title w-100" :style="`color: ${titleColor}`">{{ title }}</h1>
                </div>
            </div>
        </div>

        <div class="row books-row" :style="`background-color:${bgSolidColor}`">

            <div class="line-header">
                <div class="dark-overlay" :style="`background: ${bgColor};`"></div>
                <div class="w-100 text-center title-container">
                    <h1 class="title w-100" :style="`color: ${titleColor}`">{{ title.replace(' ','\n') }}</h1>
                </div>
                <img v-if="imageUri" :src="imageUri" alt="">
            </div>

            <div class="col col-md-3 col-sm-4 col-6 pb-5 pb-md-0"
                 v-for="book in books"
                 :key="book.id">

                <router-link :to="'/books/' + book.id">
                    <BookPreviewCard
                        :id="book.id"
                        :coverUrl="book?.volumeInfo?.imageLinks?.thumbnail"
                        :title="book.volumeInfo.title"
                        :subtitle="book.volumeInfo.subtitle"
                        :description="book.volumeInfo.description"
                        :authors="book.volumeInfo.authors"/>
                </router-link>
            </div>

            <div class="col col-md-3 col-sm-4 col-6 p-0">
                <router-link :to="`/search?query=subject:${encodeURIComponent(title)}`">
                    <div class='read-more-card'>
                        <h1>🚀</h1>
                        <h2>Read more</h2>
                        <button class='btn btn-outline-primary'>Let's Explore!</button>
                    </div>
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>

import {mapGetters} from 'vuex';
import BookPreviewCard from './BookPreviewCard.vue';
import axios from 'axios';
import httpUtils from '../utils/http';
import categories from '../config/books_categories';
import palette from '../config/palette';

export default {
    name: 'LatestBooks',

    props: {
        category: String
    },

    data(){
        return {
            books: [],
            imageUri: '',
            imageUriMobile: '',
            bgColor: '',
            bgColorMobile: '',
            bgSolidColor: '',
            title: '',
            titleColor: '',
        }
    },

    components: {
        BookPreviewCard
    },

    methods:{

        ...mapGetters(['getUser']),

        getRandomColor(){
            const index = Math.floor(Math.random() * (palette.colors.length - 1));
            return palette.colors[index];
        },

        async fetchBooks() {

            const user = this.getUser();
            const params = {
                query: 'subject:' + this.category,
                orderBy: 'newest',
            }

            if(user){
                const profile = await axios
                    .get(`profiles/${user.uid}`)
                    .then(response => response.data)
                    .catch( err => console.error(err.message));

                params.lang = profile?.language ?? '';
            }

            axios
                .get(`books?` + httpUtils.paramsToUrlQuery(params))
                .then( res => {
                    this.books = res.data.items;
                })
                .catch( err => {
                    console.error(err);
                });
        }
    },

    mounted(){

        const category = categories.categories[this.category.toLowerCase()];

        this.fetchBooks();

        this.imageUri = category?.imageUri ?? `https://source.unsplash.com/350x350/?${this.category}`;
        this.imageUriMobile = category?.imageUriMobile ?? `https://source.unsplash.com/350x250/?${this.category}`;

        this.bgSolidColor = category?.color ?? this.getRandomColor()?.hex;

        this.bgColor = `linear-gradient(90deg, ${this.bgSolidColor}44 0%, ${this.bgSolidColor}aa 70%, ${this.bgSolidColor}ff 100%);`;
        this.bgColorMobile = `linear-gradient(180deg, ${this.bgSolidColor}44 0%, ${this.bgSolidColor}aa 75%, ${this.bgSolidColor}ff 100%);`;
        this.title = category?.title ?? this.category.toUpperCase();
        this.titleColor = category?.titleColor ?? '#ffffff';
    }
}
</script>

<style lang="scss" scoped>

a {
    text-decoration: none!important;
}

.latest-books{

    /* The heart of the matter */
    .books-row {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        border-radius: 1rem;
        align-items: center;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: nowrap;
        flex-direction: row;

        .col {
            display: inline-block;
        }
    }
}

.title-container{
    position: absolute;

    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;

    height: 100%;

    .title{
        text-align: center;
        font-weight: 900;
        font-size: 2rem;
        word-break: break-all;
    }
}

.dark-overlay{
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
}

@media screen and (min-width: 1000px) {

    .line-header-mobile{
        display: none;
    }

    .line-header {
        position: relative;
        display: inline-block;
        width: 350px;
        padding-left: 0;
        background-color: #fff;

        img {
            display: inline-block;
            width: 350px;

            border-radius: 10px 0 0 10px;
        }
    }
}

@media screen and (max-width: 1000px) {

    .title{
        font-size: 3rem;
    }

    .line-header{
        display: none;
    }

    .books-row {
        border-radius: 0 0 10px 10px!important;
    }

    .line-header-mobile{
        display: block;
        height: 30vh;

        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        div{
            height: 100%;
        }

        .title-container{
            height: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: center;
            align-items: center;
        }
    }
}

.read-more-card{
    color: #333;
    text-align: center;

    background-color: #fff;

    display: inline-block;
    height: 100%;
    width: 90%;
    max-width: 20rem;

    padding-top: 20%;
    padding-bottom: 20%;
    border-radius: 1rem;
}
</style>