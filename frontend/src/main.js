import axios from 'axios';
axios.create();
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'

import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'
import bootstrapJs from 'bootstrap/dist/js/bootstrap'

createApp(App).use(store).use(bootstrapCss).use(bootstrapJs).use(router).mount('#app');