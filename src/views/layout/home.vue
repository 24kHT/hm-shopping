<template>
  <div class="home">
    <!-- 导航条 -->
      <van-nav-bar title="标题" fixed/>

    <!-- 智慧商城搜索组件 -->
     <van-search
     placeholder="请输入搜索关键词"
     background="#f1f1f2"
     shape="round"
     readonly
     @click="$router.push('/search')"
     />

     <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="@/assets/banner1.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/banner2.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/banner3.jpg" alt="">
        </van-swipe-item>
      </van-swipe>

      <!-- 导航 -->
      <van-grid column-num="5">
        <van-grid-item
        v-for="value in 10"
        :key="value"
        :icon="require('@/assets/nav1.png')" text="新品首发"
        @click="$router.push('/catagory')"
        />
      </van-grid>

      <!-- 主会场 -->
       <div class="main">
        <img src="@/assets/main.png" alt="">
       </div>

       <!-- 猜你喜欢 -->
        <div class="guess">
          <p class="guess-title">
            —— 猜你喜欢 ——
          </p>
          <div class="guess-list">
            <GoodsItem v-for="(item,index) in 5" :key="index">

            </GoodsItem>
          </div>
        </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'homeIndex',
  data () {
    return {
      value: ''
    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style lang="less" scoped>
// 主题padding
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #C21401;
  ::v-deep .van-nav-bar__title {
    color: #fff
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 999;
}

// 轮播图样式定制
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 185px;
    text-align: center;
    background-color: #39a9ed;
    img {
      height: 185px;
      width: 100%;
    }
}

// 主会场样式
.main {
  img {
    display: block;
    width: 100%;
  }
}

// 猜你喜欢
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  .goods-list {
  background-color: #f6f6f6;
}
}
</style>
