<template>
  <div>
    <div class="mt-5">
      <h1>Logout done!</h1>
      <h4 class="text-muted">We hope to see you soon again</h4>
    </div>
    <div class="mt-3">
      <router-link to="/" class="mx-2 btn btn-primary">Return to Homepage</router-link>
      <router-link to="/login" class="mx-2 btn btn-primary">Go to Login page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    window.localStorage.removeItem('_token');
    window.localStorage.removeItem('_userId');
  }
}
</script>

<style>

</style>