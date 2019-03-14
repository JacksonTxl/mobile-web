import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
			redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
			component: () => import('./views/Home.vue')
    },
    {
      path: '/register',
      name: 'register',
			component: () => import('./views/Register.vue')
    },
    {
      path: '/update',
      name: 'update',
			component: () => import('./views/Update.vue')
    },
    {
      path: '/merchant',
      name: 'merchant',
			component: () => import('./views/Merchant.vue')
    },
    {
      path: '/verify',
      name: 'verify',
			component: () => import('./views/Verify.vue')
    },
    {
      path: '/verify-history',
      name: 'verify-history',
			component: () => import('./views/VerifyHistory.vue')
    },
    {
      path: '/team',
      name: 'team',
			component: () => import('./views/Team.vue')
    },
    {
      path: '/setting',
      name: 'setting',
			component: () => import('./views/Setting.vue')
    },
    {
      path: '/setting-person',
      name: 'setting-person',
			component: () => import('./views/SettingPerson.vue')
    },
    {
      path: '/setting-pwd',
      name: 'setting-pwd',
			component: () => import('./views/SettingPwd.vue')
    },
    {
      path: '/service',
      name: 'service',
			component: () => import('./views/Service.vue')
    },
    {
      path: '/login',
      name: 'login',
			component: () => import('./views/Login.vue')
    }
  ]
})
