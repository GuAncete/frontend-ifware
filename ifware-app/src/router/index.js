import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/HomeView.vue';
import Login from '../pages/LoginView.vue';
import ProjectsView from '../pages/ProjectsView.vue';
import TasksView from '../pages/TasksView.vue';
import ColaboratorView from '../pages/ColaboratorsView.vue';

const routes = [
  { path: "/login", component: Login, meta: { hideSideBar: true } },
  { path: "/", component: Home },
  { path: "/projetos", component: ProjectsView },
  { path: "/tarefas", component: TasksView },
  { path: "/colaboradores", component: ColaboratorView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;