import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ViewPage from './views/ViewPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/v/:siteid',
      name: 'viewSite',
      // lazy-loaded when the route is visited.
      props: true,
      component: ViewPage
    },
    {
      path: '/v/:siteid/:pageid',
      name: 'viewPage',
      // lazy-loaded when the route is visited.
      props: true,
      component: ViewPage
    },
    {
      path: '/archive/:siteid',
      name: 'viewFullSite',
      props: true,
      component: () => import(/* webpackChunkName: "site" */ './views/ViewFullSite.vue')
    },
    {
      path: '/u/:nickname',
      name: 'profile',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "viewpage" */ './views/Profile.vue')
    },
    {
      path: '/l/sites',
      name: 'listSites',
      // lazy-loaded when the route is visited.
      props: false,
      component: () => import(/* webpackChunkName: "listSites" */ './views/ListSites.vue')
    },
    {
      path: '/l/pages/:siteid',
      name: 'listPages',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "listPages" */ './views/ListPages.vue')
    },
    {
      path: '/l/attachments/:siteid',
      name: 'listAttachments',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "listAttachments" */ './views/ListAttachments.vue')
    },
    {
      path: '/e/:siteid/:pageid',
      name: 'editPage',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "editor" */ './views/Editor.vue')
    },
    {
      path: '/i/:siteid/:pageid',
      name: 'pageInfo',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "pageinfo" */ './views/PageInfo.vue')
    },
    {
      path: '/r/:siteid/:pageid/:revisionid',
      name: 'pageRevision',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "pageinfo" */ './views/ViewRevision.vue')
    },
    {
      path: '/testlogin',
      name: 'testlogin',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "testlogin" */ './views/EmailLogin.vue')
    },
    {
      path: '/c/site/:siteid',
      name: 'sitesettings',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "site" */ './views/SiteSettings.vue')
    },
    {
      path: '/g/:siteid/gm/players',
      name: 'gmplayers',
      // lazy-loaded when the route is visited.
      props: true,
      component: () => import(/* webpackChunkName: "site" */ './views/gm/PlayerList.vue')
    }
  ]
})
