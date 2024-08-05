import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home.vue'
import Catelogue from '@/views/layout/catelogue.vue'
import Cart from '@/views/layout/cart.vue'
import My from '@/views/layout/my.vue'

import store from '@/store'

const Login = () => import('@/views/login')
const Myorder = () => import('@/views/myorder')
const Search = () => import('@/views/search')
const Prodetail = () => import('@/views/prodetail')
const SearchList = () => import('@/views/search/list.vue')
const Address = () => import('@/views/address')
const Pay = () => import('@/views/pay')

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
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/address',
    component: Address
  },
  {
    path: '/pay',
    component: Pay
  }
]

const router = new VueRouter({
  routes
})

const authUrl = ['/pay', '/myorder']

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
