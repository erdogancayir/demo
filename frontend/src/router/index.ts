import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import profileView from '../views/profileView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('../views/signIn.vue')
  },
  {
    path: '/profile',
    name: 'profileView',
    component: profileView
  },
  {
    path: '/chat',
    name: 'ChatView',
    component: () => import('../views/ChatView.vue')
  },
  {
    path: '/setting',
    name: 'settingView',
    component: () => import('../views/settingView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404NotFound',
    component: () => import('../views/404View.vue')
  },
  {
    path: '/game',
    name: 'GameView',
    component: () => import('../views/GameView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
