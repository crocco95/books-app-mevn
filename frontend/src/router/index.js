import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/profiles/:userId',
    props: true,
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/books/:id',
    props: true,
    name: 'Book',
    component: () => import('../views/Book.vue')
  },
  {
    path: '/register',
    props: true,
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    props: true,
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration-success',
    props: true,
    name: 'SuccessfulRegistration',
    component: () => import('../views/SuccessfulRegistration.vue')
  },
  {
    path: '/logout',
    props: true,
    name: 'Logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/PageNotFound.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
