import axios from 'axios';
axios.create({
  baseURL: 'http://localhost:8080'
});

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import firebase from './config/firebase';

import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'
import bootstrapJs from 'bootstrap/dist/js/bootstrap'

createApp(App).use(store).use(bootstrapCss).use(bootstrapJs).use(router).mount('#app');