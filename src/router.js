import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/index'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "create" */ './views/create.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import(/* webpackChunkName: "edit" */ './views/edit.vue')
    }
  ]
})

export default router
