<template>
  <div class="searchlist">

  <!-- 导航栏 -->
  <van-nav-bar
  title="商品列表"
  left-arrow
  @click-left="$router.back()"
  />

  <!-- 搜索 -->
  <van-search
  show-action
  readonly
    shape="round"
    background="#ffffff"
  :value="querySearch"
  @click="$router.push('/search')"
  >
    <template #action>
      <van-icon class="tool" name="apps-o" />
    </template>
  </van-search>

  <!-- 排序选择按钮 -->
  <div class="sort-btns">
    <div class="sort-item">综合</div>
    <div class="sort-item">销量</div>
    <div class="sort-item">价格</div>
  </div>

  <!-- 商品列表 -->
   <div class="goods-list">
    <GoodsItem v-for="item in proList" :key="item.goodss_id" :item="item"></GoodsItem>
   </div>
  </div>
</template>

<script>
import { getSearchList } from '@/api/search'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'searchListIndex',
  async created () {
    // 分类页跳转至搜索列表
    this.categoryId = this.$route.query.id
    // console.log(this.categoryId)
    const res = await getSearchList({
      categoryId: this.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = res.data.list.data
    // console.log(this.proList)
  },
  data () {
    return {
      page: 1,
      proList: [],
      categoryId: ''
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  }
}
</script>

<style lang="less" scoped>
.searchlist {
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
   .tool {
     font-size: 24px;
     height: 40px;
     line-height: 40px;
  }
  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      flex: 1;
      text-align: center;
      font-size: 16px;
      // &:nth-child(2n+1){
      //   background-color: blueviolet;
      // }
    }
  }
  // 商品样式
  .goods-list {
  background-color: #f6f6f6;
  }
}
</style>
