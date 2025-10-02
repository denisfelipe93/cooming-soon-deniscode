import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/privacy', component: () => import('@/views/PrivacyPolicy.vue') },
  { path: '/terms',   component: () => import('@/views/Terms.vue') }
  // sem catch-all/redirect por enquanto para evitar loop
]

export default createRouter({
  history: createWebHistory(),
  routes
})
