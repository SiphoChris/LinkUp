import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import('../views/DirectMessagesView.vue')
  },
  {
    path: '/profile',
    name: 'prodile',
    component: () => import('../views/ProfileView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
