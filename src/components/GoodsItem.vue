<template>
  <!-- 商品列表组件 -->
  <div class="goods-item">
    <div class="left">
      <img src="@/assets/product.jpg" alt="">
    </div>
    <div class="right">
      <p class="tit">三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫
        5G手机 游戏拍照旗舰机s23</p>
      <p class="count">已售104件</p>
      <p class="price">
        <span class="new">¥3999.00</span>
        <span class="old">¥6999.00</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {

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
