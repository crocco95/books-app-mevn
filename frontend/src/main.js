import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'

createApp(App).use(store).use(bootstrap).use(router).mount('#app')
