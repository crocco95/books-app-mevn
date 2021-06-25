<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-md-6">
        <div class="bg-column"></div>
      </div>
      <div class="col-md-6">
        <div class="p-5">
          <h1 class="fw-bolder">Welcome Back!</h1>
          <FirebaseLoginModule />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import FirebaseLoginModule from '@/components/FirebaseLoginModule';

export default {
  components: {
    FirebaseLoginModule
  },
}
</script>

<style>
  .bg {
    width: 100%;
    border-radius: 1rem;
  }

  .bg-column{
    height: 100%;
    background-image: url('../assets/bg_registration.jpg');
    background-position: center;
    background-size: cover;
  }
</style>