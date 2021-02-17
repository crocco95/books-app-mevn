import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'
import bootstrapJs from 'bootstrap/dist/js/bootstrap'
import store from './store'
import firebase from 'firebase/app';

// Init firebase
import firebaseConfig from './config/firebase';
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(bootstrapCss).use(bootstrapJs).use(router).mount('#app')
