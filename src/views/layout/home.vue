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
        <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
          <img :src="item.imgUrl" alt="">
        </van-swipe-item>
      </van-swipe>

      <!-- 导航 -->
      <van-grid column-num="5">
        <van-grid-item
        v-for="item in navList"
        :key="item.imgUrl"
        :icon="item.imgUrl"
        :text="item.text"
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
            <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item">
            </GoodsItem>
          </div>
        </div>
  </div>
</template>

<script>
import { getHome } from '@/api/login'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'homeIndex',
  async created () {
    const { data: { pageData } } = await getHome()
    console.log(pageData)
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
  },
  data () {
    return {
      value: '',
      bannerList: null,
      navList: null,
      proList: null
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
