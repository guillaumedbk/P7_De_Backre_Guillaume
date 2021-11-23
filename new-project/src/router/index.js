import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'Inscription',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Inscription.vue')
  },
  {
    path:'/accueil',
    name:'Accueil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Accueil.vue')
  },
  {
    path:'/creation',
    name:'Creation',
    component: () => import(/* webpackChunkName: "about" */ '../views/Creation.vue')
  },
  {
    path:'/commentaire/:id',
    name:'Commentaire',
    component: () => import(/* webpackChunkName: "about" */ '../views/Commentaire.vue')
  },
  {
    path:'/post/:id?',
    name:'Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue')
  },
  {
    path:'/modification/:id?',
    name:'Modification',
    component: () => import(/* webpackChunkName: "about" */ '../views/Modification.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
