<template>
  <div class="container profile">
    <img src="https://thispersondoesnotexist.com/image" alt="Profile picture" class="main-picture" />
    <h1 v-text="profile.name + ' ' + profile.surname"></h1>
    
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="row">
          <div class="col-md text-center">
            Followers: <strong v-text="followers"></strong>
          </div>
          <div class="col-md text-center">
            Following: <strong v-text="following"></strong>
          </div>
          <div class="col-md" v-if="followingButtonVisible">
            <button class="btn btn-sm btn-primary" @click="followUser">Follow</button>
          </div>
          <div class="col-md" v-if="!followingButtonVisible">
            <button class="btn btn-sm btn-danger" @click="unfollowUser">Unfollow</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6 offset-md-3">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>Books you are reading</th>
              <td>
                <span v-text="readingBooks"></span>
              </td>
            </tr>

            <tr>
              <th>Total books read</th>
              <td>
                <span v-text="readBooks"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 text-center">
        <h1>Activities</h1>
        <h4 class="text-muted">Below you can see all the books you read and are reading now</h4>
      </div>
    </div>
    
    <UserBookReadList class="my-5" :userId="userId" />

  </div>
</template>

<script>

import axios from 'axios';
import UserBookReadList from '../components/UserBookReadList';

export default {
  components: {
    UserBookReadList,
  },

  props: {
    userId: String
  },

  data(){
    return {
      profile: {},
      readingBooks: 0,
      readBooks: 0,
      followers: 0,
      following: 0,
      followingButtonVisible: false,
    }
  },

  methods:{

    followUser(){

      const loggedUserId = window.localStorage.getItem('_userId');
      const token = window.localStorage.getItem('_token');

      axios
        .post(`http://localhost:3000/api/v1/users/${loggedUserId}/social`,{
          followingUserId: this.userId
        },{
          'Authorization': token
        })
        .then( res => {
          this.followingButtonVisible = false;
        })
        .catch( err => console.error( err ));
    },

    unfollowUser(){

      const loggedUserId = window.localStorage.getItem('_userId');
      const token = window.localStorage.getItem('_token');

      axios
        .delete(`http://localhost:3000/api/v1/users/${loggedUserId}/social/${this.userId}`,{
          headers:{
            'Authorization': token
          }
        })
        .then( res => {
          this.followingButtonVisible = true;
        })
        .catch(err => console.error(err));
    },

    checkFollow(){

      const loggedUserId = window.localStorage.getItem('_userId');

      axios
        .get(`http://localhost:3000/api/v1/users/${loggedUserId}/social/${this.userId}`)
        .then( res => {
          this.followingButtonVisible = res.data === null;
        })
        .catch(err => console.error(err));
    },

    fetchUserDetails(){

      axios
        .get(`http://localhost:3000/api/v1/profiles/${this.userId}`)
        .then( res => this.profile = res.data )
        .catch( err => console.error(err));
    },

    fetchUserBooks(){

      axios
        .get(`http://localhost:8080/api/v1/users/${this.userId}/books`)
        .then( res => {
          res.data.forEach( b => {
            
            if( b.finishDate ){
              this.readBooks += 1;
            }else{
              this.readingBooks += 1;
            }
          })
        })
        .catch( err => console.error(err.response.data));
    }
  },

  mounted(){
    const loggedUserId = window.localStorage.getItem('_userId');

    this.fetchUserDetails();
    this.fetchUserBooks();
    this.checkFollow();
  }
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