import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/1', component: () => import('@/views/day1/index.vue') }],
})

export default router
