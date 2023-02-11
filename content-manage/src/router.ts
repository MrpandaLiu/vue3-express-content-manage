import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Layout from '@/pages/Admin/adminLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/admin/index',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/loginIndex.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/pages/Admin/adminLayout.vue'),
    children: [
      {
        path: '/admin/index',
        name: 'AdminIndex',
        component: () => import('@/pages/Admin/index/indexPage.vue'),
      },
      {
        path: '/admin/content',
        name: 'AdminContent',
        component: () => import('@/pages/Admin/content/contentPage.vue'),
      },
      {
        path: '/admin/note',
        name: 'AdminNote',
        component: () => import('@/pages/Admin/note/notePage.vue'),
      },
      {
        path: '/admin/data',
        name: 'AdminData',
        component: () => import('@/pages/Admin/data/dataPage.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404Page.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
