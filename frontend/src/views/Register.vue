<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-md-6">
        <div class="bg-column"></div>
        <!-- <img src="../assets/bg_registration.jpg" class="bg" alt=""> -->
      </div>
      <div class="col-md-6">
        <div class="p-5">
          <h1 class="fw-bolder">HOWDY! DO YOU COME IN?</h1>
          <FirebaseRegistrationModule />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import FirebaseRegistrationModule from '../components/FirebaseRegistrationModule';

export default {
  components: {
    FirebaseRegistrationModule
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