<template>
  <div>
    <!-- 二级路由出口 -->
     <router-view></router-view>

<van-tabbar route active-color="#ee0a24" inactive-color="#000">
  <van-tabbar-item to="/home" icon="wap-home-o">主页</van-tabbar-item>
  <van-tabbar-item to="/catelogue" icon="apps-o">分类</van-tabbar-item>
  <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
  <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>

</template>

<script>
import request from '@/utils/request'
export default {
  name: 'layoutIndex',
  async created () {
    const res = await request({
      url: '/page/detail',
      method: 'get'
    })
    console.log(res)
  }
}
</script>

<style>

</style>
