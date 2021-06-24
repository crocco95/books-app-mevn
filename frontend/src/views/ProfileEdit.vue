<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-8 offset-md-2">
        <h1>Edit profile</h1>
      </div>

      <div class="col-md-8 offset-md-2">
        <ProfileEditForm />
      </div>
    </div>
  </div>
</template>
<script>

import ProfileEditForm from "@/components/ProfileEditForm";

export default {
  components: {
    ProfileEditForm,
  } 
}
</script>