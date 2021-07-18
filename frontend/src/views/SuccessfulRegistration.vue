<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-8 offset-md-2">
        <div class="alert alert-success">
          <strong>🥳 Success!</strong> <span>Registration is almost complete!</span>
        </div>
      </div>
    </div>

    <!-- START info text -->
    <div class="row mt-1">
      <div class="col-md-8 offset-md-2">
        <p>
          A confirmation email is sent to your email address, go to click the link inside to verify it and enable the login.
        </p>
      </div>
    </div>
    <!-- END info text -->

    <!-- START Continue button -->
    <div class="row mt-1">
      <div class="col-md-12">
        <router-link class="btn btn-primary px-5" to="/login">Continue to login</router-link>
      </div>
    </div>
    <!-- END Continue button -->

  </div>
</template>

<script>
export default {
    data(){
        return {
            pageTitle: 'You are in! | MEVN Books App',
        }
    },

    mounted() {
        // Set page meta title
        document.title = this.pageTitle;
    }
}
</script>

<style scoped>
  .category-emoji{
    font-size: 5rem;
  }
</style>