<template>
<div class="category">
   <!-- 分类 -->
    <van-nav-bar title="全部分类" fixed />

    <!-- 搜索框 -->
    <van-search
    class="search"
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />

    <!-- 分类列表 -->
     <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item,index) in cateList" :key="item.category_id">
            <a :class="{'active':index === activeIndex}" @click="activeIndex=index" href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="cate-goods" v-for="item in cateList[activeIndex]?.children" :key="item.category_id" @click="$router.push(`/searchlist?id=${item.category_id}`)">
          <img :src="item.image?.external_url" alt="">
          <p>{{ item.name }}</p>
        </div>
      </div>
     </div>
</div>
</template>

<script>
import { getCategory } from '@/api/category'

export default {
  name: 'categoryPage',
  async created () {
    const res = await getCategory()
    this.cateList = res.data.list
    console.log(this.cateList)
  },
  data () {
    return {
      cateList: [],
      activeIndex: 0
    }
  }
}
</script>

<style lang="less" scoped>
// 分类主题 padding
.category {
  padding-top: 100px;
  padding-bottom: 50px;
  height: 100vh;
  .list-box {
    height: 100%;
    display: flex;
    .left {
      width: 85px;
      height: 100%;
      z-index: 999;
      background-color: #f3f3f3;
      overflow: auto;
      ul {
        li{
          a {
            display: block;
            height: 45px;
            line-height: 45px;
            text-align: center;
            font-size: 12px;
            color: #444444;
            &.active {
              color:#fb442f;
              background-color: #fff;
            }
          }
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      overflow: auto;
      justify-content: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      display: flex;
      padding: 10px 0;
      background-color: #ffffff;
      .cate-goods {
        width: 33.3%;
        margin-bottom: 10px;
        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 5px auto;
        }
        p {
          text-align: center;
          font-size: 12px;
        }
      }
      }
  }
}

// 导航样式定制
.van-nav-bar {
  z-index: 999;
}

// 搜索框样式定制
.van-search {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 999;
}

</style>
