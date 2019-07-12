import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/pages/Login').default
    },
    {
      path: '/index',
      name: 'index',
      component: require('@/pages/Home/Index').default
    }
  ]
})

router.beforeEach((to, from, next) => {
  const status = true
  if (status) {
    next()
  } else {
    console.log('无权限')
  }
})

export default router
