<template>
  <div class="loader">
    <div class="text-center">
      <img src="https://i.pinimg.com/originals/4f/8f/48/4f8f4849d7ca6c6d81964c3c61f9d085.gif" alt="Loading..." width="300">
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){
      console.log("Loader mounted");
    }
  }
</script>


<style scoped>
  .loader{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;

    align-content: center;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;

    height: 100vh;
    width: 100vw;

    background-color: #fdfefd;

    overflow: hidden;
    z-index: 9999999;
  }
</style>