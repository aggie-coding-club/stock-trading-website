import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Trade from "../views/Trade.vue"
import Portfolio from "../views/Portfolio.vue"
import Login from "../views/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: "/trade",
        name: "Trade",
        component: Trade,
    },
    {
        path: "/portfolio",
        name: "Portfolio",
        component: Portfolio,
    },
    {
        path: "/user",
        name: "User",
        component: Login,
    }
  ]
})

export default router
