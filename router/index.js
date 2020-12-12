import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Download from '../views/Download.vue'
import List from '../views/List.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/download',
    name: 'Download',
    component: Download
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
