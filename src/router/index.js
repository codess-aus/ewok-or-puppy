import { createRouter, createWebHistory } from 'vue-router'
import Detector from '@/views/Detector.vue'

const routes = [
  {
    path: '/',
    name: 'Detector',
    component: Detector
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router