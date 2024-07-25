import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/layout/home.vue'
import Catelogue from '@/views/layout/catelogue.vue'
import Cart from '@/views/layout/cart.vue'
import My from '@/views/layout/my.vue'
import Myorder from '@/views/myorder'
import Search from '@/views/search'
import Prodetail from '@/views/prodetail'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/catelogue',
        component: Catelogue
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/my',
        component: My
      }
    ]
  },
  {
    path: '/myorder',
    component: Myorder
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/prodetail/:id',
    component: Prodetail
  }
]

const router = new VueRouter({
  routes
})

const authUrl = ['/cart', '/myorder']

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 访问非登录权限页面
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  // 访问登录权限页面
  const token = store.state.user.userInfo.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
