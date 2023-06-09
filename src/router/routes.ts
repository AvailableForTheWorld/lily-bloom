const routes = [
  { path: '/', component: () => import('@/components/three/index.vue') },
  { path: '/1', component: () => import(`@/views/day1/index.vue`) },
  { path: '/2', component: () => import(`@/views/day2/index.vue`) },
  { path: '/3', component: () => import(`@/views/day3/index.vue`) },
  { path: '/4', component: () => import(`@/views/day4/index.vue`) },
  { path: '/5', component: () => import(`@/views/day5/index.vue`) },
]

// q: 动态路由如何匹配动态组件

export default routes
