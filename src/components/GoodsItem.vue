<template>
  <!-- 商品列表组件 -->
  <div v-if="item.goods_name" class="goods-item" @click="$router.push('/prodetail')">
    <div class="left">
      <img :src="item.goods_image" alt="">
    </div>
    <div class="right">
      <p class="tit">{{ item.goods_name }}</p>
      <p class="count">已售{{ item.goods_sales }}件</p>
      <p class="price">
        <span class="new">¥{{ item.goods_price_min }}</span>
        <span class="old">¥{{ item.goods_price_max }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style>
.goods-item {
  background-color: #fff;
  display:flex;
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  .left {
    width: 127px;
    background-color: pink;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;

    .tit {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
       color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
