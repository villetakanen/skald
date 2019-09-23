import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/stylebook',
      name: 'stylebook',
      // lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "stylebook" */ './views/Stylebook.vue')
    },
    {
      path: '/v/:siteid',
      name: 'viewSite',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "viewsite" */ './views/ViewSite.vue')
    },
    {
      path: '/v/:siteid/:pageid',
      name: 'viewPage',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "viewpage" */ './views/ViewPage.vue')
    },
    {
      path: '/e/:siteid/:pageid',
      name: 'editPage',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "editor" */ './views/Editor.vue')
    },
    {
      path: '/testlogin',
      name: 'testlogin',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "testlogin" */ './views/EmailLogin.vue')
    }
  ]
})
