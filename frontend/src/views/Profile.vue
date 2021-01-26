<template>
  <div class="container profile">
    <img src="https://thispersondoesnotexist.com/image" alt="Profile picture" class="main-picture" />
    <h1>Lorenzo Croccolino</h1>
    <div class="row">
      <div class="col-md-3 offset-md-3 text-center">
        Followers: <strong>100</strong>
      </div>
      <div class="col-md-3 text-center">
        Following: <strong>100</strong>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6 offset-md-3">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>Books you are reading</th>
              <td>10</td>
            </tr>

            <tr>
              <th>Favorite genres</th>
              <td>10</td>
            </tr>

            <tr>
              <th>Total books read</th>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 text-center">
        <h1>Your activities</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <span class="text-secondary">No activities yet :(</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style>
  .profile {

  }

  .main-picture {
    display: block;
    margin: 0 auto;
    width: 100px;
    height: 100px;

    border-radius: 10rem 10rem 0;
  }

  table tr:first {
    border-radius: 1rem;
  }

  table th {
    text-align: left;
  }
</style>