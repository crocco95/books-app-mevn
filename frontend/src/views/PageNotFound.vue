<template>
  <h1>404</h1>
  <p>404 Page Not Found :(</p>
  <div>
    <router-link to="/">Torna alla Homepage</router-link>
  </div>
</template>

<script>
export default {
    data(){
        return {
            pageTitle: 'Page not found | MEVN Books App'
        }
    },

    mounted() {
        // Set page meta title
        document.title = this.pageTitle;
    }
}
</script>