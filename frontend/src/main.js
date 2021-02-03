import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import firebase from 'firebase/app';

// Init firebase
import firebaseConfig from './config/firebase';
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(bootstrap).use(router).mount('#app')
