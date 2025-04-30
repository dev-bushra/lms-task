import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import HomePage from '../pages/HomePage.vue'
import AdminPage from '../pages/AdminPage.vue'

const routes = [
  // { path: '/', redirect: '/home' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/', component: HomePage },
  { path: '/admin', component: AdminPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
