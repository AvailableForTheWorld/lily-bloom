const routes = [
  { path: '/', component: () => import('@/components/three/index.vue') },
  { path: '/1', component: () => import(`@/views/day1/index.vue`) },
  { path: '/2', component: () => import(`@/views/day2/index.vue`) },
]

// q: 动态路由如何匹配动态组件

export default routes
