<template>
  <div>
    <!-- START Error alert -->
    <div class="row">
      <div class="col-md-12">
        <div class="alert alert-danger" v-if="error">
          <strong>Error: </strong>
          <span v-text="error.message"></span>
        </div>
      </div>
    </div>
    <!-- END Error alert -->

    <!-- START Success alert -->
    <div class="row">
      <div class="col-md-12">
        <div class="alert alert-success" v-if="success">
          <strong>Success: </strong>
          <span>
            Profile updated successfully!
            <router-link :to="`/profiles/${getUser().uid}`">Return to profile</router-link>
          </span>
        </div>
      </div>
    </div>
    <!-- END Success alert -->

    <!-- START Registration form -->
    <div class="row">
      <div class="col-md-12">
        <form class="form text-start" @submit="save">

          <!-- START Name field -->
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="name"
              class="form-control"
              placeholder="Your name"
              id="name"
              v-model="name"
              autocomplete="name"
              :disabled="isLoading" />
          </div>
          <!-- END Name field -->

          <!-- START Surname field -->
          <div class="mb-3">
            <label for="surname" class="form-label">Surname</label>
            <input type="surname"
              class="form-control"
              placeholder="Your surname"
              id="surname"
              v-model="surname"
              :disabled="isLoading" />
          </div>
          <!-- END Surname field -->

          <!-- START Genre field -->
          <div class="mb-3">
            <label for="genre" class="form-label">Genre</label>
            <select
            id="genre"
            class="form-select"
            v-model="genre"
            :disabled="isLoading">
              <option value="none">I don't want say that</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <!-- END Genre field -->

          <!-- START Language field -->
          <div class="mb-3">
            <label for="language" class="form-label">Language</label>
            <select
            id="language"
            class="form-select"
            :disabled="isLoading"
            v-model="language">
              <option
              v-for="language in languages"
              :key="language.code"
              :value="language.code"
              :selected="getUser().language === language.code"
              v-text="language.name"></option>
            </select>
          </div>
          <!-- END Language field -->

          <!-- START Save button -->
          <div class="text-end">
            <button
            type="submit"
            class="btn btn-primary"
            :disabled="isLoading"
            v-text="isLoading ? '💾 Loading...' : '💾 Save'"></button>
          </div>
          <!-- END Save button -->

        </form>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
import ISO6391 from 'iso-639-1';
import axios from 'axios';

export default {
  data(){
    return {
      error: '',
      success: '',
      languages: [],
      isLoading: false,
      name: '',
      surname: '',
      genre: '',
      imageUrl: '',
      language: '',
    }
  },

  methods:{
    ...mapGetters(['getUser']),

    getProfile(userId){
      return axios.get(`profiles/${userId}`);
    },

    save(){
      
      // Set loading flag to disable input while is loading
      this.isLoading = true;
      
      const user = this.getUser();
      axios.put(`profiles/${user.uid}`,{
        name: this.name,
        surname: this.surname,
        language: this.language,
        genre: this.genre,
      })
      .then( () => this.success = true)
      .catch( err => this.error = err)
      .finally(() => this.isLoading = false);
    },
  },

  mounted(){
    const codes = ISO6391.getAllCodes();
    const user = this.getUser();

    codes.forEach(c => {
      this.languages.push({
        code: c,
        name: ISO6391.getName(c),
      });
    });

    this.getProfile(user.uid)
      .then(profile => {
        const data = profile.data;
        this.name = data.name;
        this.surname = data.surname;
        this.genre = data.genre;
        this.language = data.language;
      });
  }
}
</script>
