import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import ListNoLogin from '@/pages/listNoLogin'
import ListLogin from '@/pages/listLogin'
import ListDetail from '@/pages/listDetail'
import DocView from '@/pages/docView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list-login',
      name: 'listLogin',
      component: ListLogin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'listNoLogin',
      component: ListNoLogin
    },
    {
      path: '/list-detail/:guid?',
      name: 'listDetail',
      component: ListDetail
    },
    {
      path: '/doc-view',
      name: 'docView',
      component: DocView
    }
  ]
})
