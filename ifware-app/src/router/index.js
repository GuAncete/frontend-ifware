import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '@/services/auth.js'


const routes = [
  { path: "/login",
    name: "Login",
    component: () => import("../pages/LoginView.vue"),
    meta: { hideSideBar: true } ,
  },
  { path: "/", 
    name: "Home",
    component: () => import("../pages/HomeView.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/projetos", 
    name: "Projects",
    component: () => import("../pages/ProjectsView.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/tarefas", 
    name: "Tasks",
    component: () => import("../pages/TasksView.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/colaboradores",
    name: "Colaborators",
    component: () => import("../pages/ColaboratorsView.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/clientes",
    name: "Clients",
    component: () => import("../pages/ClientesView.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/config",
    name: "Config",
    component: () => import("../pages/ConfigView.vue"),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Simple auth guard
router.beforeEach((to, from, next) => {
  const token = getToken()
  const isAuth = !!token
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth)

  if (to.name === 'Login') {
    if (isAuth) {
      next({ path: '/' })
    } else {
      next()
    }
    return
  }

  if (!isAuth) {
    const redirect = to.fullPath && to.fullPath !== '/' ? { redirect: to.fullPath } : {}
    next({ path: '/login', query: redirect, replace: true })
    return
  }

  if (requiresAuth || to.matched.length === 0) {
    next()
    return
  }

  next()
})

export default router;