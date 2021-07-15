<template>
    <div class="search">
        <small v-if="totalResults">Sono stati trovati {{ totalResults }} risultati</small>
        <form class="input-group mb-3" @submit="search">
            <input type="text"
                   class="form-control"
                   placeholder="Search something like 'Harry Potter'"
                   aria-label="Example text with button addon"
                   aria-describedby="button-search"
                   :disabled="searchingFlag"
                   v-model="query"/>

            <button class="btn btn-white"
                    type="submit"
                    id="button-search"
                    :disabled="searchingFlag">

                <span v-if="!searchingFlag">Let's Go!</span>
                <span v-else>Searching...</span>

            </button>
        </form>

    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {

    props: {
        query: String,
    },

    data() {
        return {
            searchingFlag: false,
            totalResults: false,
            results: [],
        }
    },

    methods: {

        ...mapGetters(['getUser']),
        ...mapActions(['fetchBooks']),

        async search(event = null) {

            // Prevent the submit event
            if(event){
                event.preventDefault();
            }

            // If the query is empty, don't continue
            if( !this.query ){
                alert("You must write something to search!");
                return;
            }

            this.searchingFlag = true;

            const user = this.getUser();
            const searchParams = {
                query: this.query,
                limit: 12,
            };

            if(user){
                const profile = await axios
                    .get(`profiles/${user.uid}`)
                    .then(response => response.data)
                    .catch( err => console.error(err.message));

                searchParams.lang = profile?.language ?? '';
            }

            // Perform the request
            this.fetchBooks(searchParams).then( () => {
                this.searchingFlag = false;
            });
        },
    },

    mounted(){
        if(this.query){
            this.search();
        }
    }
}
</script>

<style scoped>
.search{
    text-align: left;
}

.search input {
    display: inline-block;
    width: auto;
    margin: 0 auto;
    padding: 1rem;

    border-radius: 1rem;
    border: none;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
}

button{
    display: inline-block;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
}
</style>