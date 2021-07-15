<template>
  <div class="container-static-carousel">
    <div id="static-carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#static-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#static-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#static-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img src="/img/static_carousel/search.jpg" class="d-block w-100" alt="Carousel search">
          <div class="carousel-caption d-block">
            <h5 class="h1 fw-bolder">START TO SEARCH</h5>
            <p>Check our database, search a book and discover new ones!</p>
            <router-link to="/search" class="btn btn-primary">🔍 Search now</router-link>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="/img/static_carousel/friends.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-block">
            <h5 class="h1 fw-bolder">FOLLOW YOUR FRIENDS</h5>
            <p>Some representative placeholder content for the second slide.</p>
            <router-link to="/register" class="btn btn-primary">🤜 🤛 Register now!</router-link>
          </div>
        </div>
        <div class="carousel-item">
          <img src="/img/static_carousel/book.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-block">
            <h5 class="h1 fw-bolder">DISCOVER NEW RELEASES</h5>
            <p>Some representative placeholder content for the third slide.</p>
            <router-link to="/register" class="btn btn-primary">🤩 Register now!</router-link>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#static-carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#static-carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

  .container-static-carousel{

    border-radius: 0 0 1rem 1rem;

    .carousel-caption{
      background-color: rgba(0,0,0,.4);
      padding: 2rem 1rem;
    }
    .carousel-item{
      max-height: 60vh;
    }
  }
</style>