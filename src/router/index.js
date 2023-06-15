import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('../views/AppView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserAddView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/UserEditView.vue')
    }
  ]
})

export default router
