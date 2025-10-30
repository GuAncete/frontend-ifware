import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../pages/HomeView.vue';
import LoginView from '../pages/LoginView.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: HomeView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;