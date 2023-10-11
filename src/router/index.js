import { createRouter, createWebHistory } from 'vue-router'
import Weather from '../views/Weather.vue'
import Search from '../views/Search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Weather
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})

export default router
