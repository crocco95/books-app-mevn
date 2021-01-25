import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(bootstrap).use(router).mount('#app')
