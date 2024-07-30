<template>
  <div class="prodetail">
  <!-- 导航栏 -->
   <van-nav-bar
  title="商品详情页"
  left-arrow
  @click-left="$router.back()"
  fixed
/>

  <!-- 轮播图 -->
  <van-swipe autoplay="4000" @change="onChange">
    <van-swipe-item v-for="(item,index) in goods_images" :key="index">
      <img :src="item.external_url" alt="">
    </van-swipe-item>
  <template #indicator>
    <div class="custom-indicator">{{ current + 1 }}/4</div>
  </template>
</van-swipe>

   <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>

      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ comment_count }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score/2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

     <!-- 商品描述 -->
    <div class="desc" v-html="detail.content">

    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/home')">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart" @click="$router.push('/cart')">
        <span v-if="totalCount > 0" class="num">{{ totalCount }}</span>
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="addFn">加入购物车</div>
      <div class="btn-buy" @click="buyFn">立刻购买</div>
    </div>

    <!-- 动作弹窗 -->
    <van-action-sheet v-model="showPannel" :title="mode==='cart'?'加入购物车':'立即购买'">
      <div class="product">
    <div class="product-title">
      <div class="left">
        <img :src="detail.goods_image" alt="">
      </div>
      <div class="right">
        <div class="price">
          <span>¥</span>
          <span class="nowprice">9.99</span>
        </div>
        <div class="count">
          <span>库存</span>
          <span>55</span>
        </div>
      </div>
    </div>
    <div class="num-box">
      <span>数量</span>
      <countBox v-model="count"></countBox>
    </div>
    <div class="showbtn" v-if="detail.stock_total > 0">
      <div class="btn" v-if="mode === 'cart'" @click="handleAdd">加入购物车</div>
      <div class="btn now" v-else @click="handleBuy">立刻购买</div>
    </div>
    <div class="btn-none" v-else>该商品已抢完</div>
  </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { cartAddSend } from '@/api/cart'
import { getComment, getDetailPro } from '@/api/prodetail'
import defaultImg from '@/assets/default-avatar.png'
import countBox from '@/components/CountBox.vue'

export default {
  name: 'proDetailIndex',
  components: {
    countBox
  },
  async created () {
    const res = await getDetailPro(this.id)
    this.detail = res.data.detail
    // console.log(this.detail)
    this.goods_images = res.data.detail.goods_images
    // console.log(this.goods_images)
    this.getComment()
  },
  data () {
    return {
      current: 0,
      detail: [],
      goods_images: [],
      comment_count: 5,
      defaultImg,
      commentList: [],
      showPannel: false,
      mode: 'cart',
      count: 1,
      totalCount: 0
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    // 获取商品评价
    async getComment () {
      const res = await getComment(this.id, this.comment_count)
      this.commentList = res.data.list
      // console.log(this.commentList)
    },
    // 弹出加入购物车框
    addFn () {
      this.mode = 'cart'
      this.showPannel = true
    },
    // 弹出购买框
    buyFn () {
      this.mode = 'buyNow'
      this.showPannel = true
    },
    // 验证是否登录状态
    isLogin () {
      if (this.$store.state.user.userInfo.token) {
        return 1
      } else {
        return 0
      }
    },
    // 购买
    async handleBuy () {
      // 判断是否登录状态
      if (!this.isLogin()) {
        console.log('请登录')
        Dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
          // on confirm
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
          // on cancel
          })
      } else {
        // 登陆了
        console.log('已登录')
      }
    },
    // 添加到购物车
    async handleAdd () {
      // 判断是否登录状态
      if (!this.isLogin()) {
        console.log('请登录')
        this.$router.replace({
          path: '/login',
          query: {
            backUrl: this.$route.fullPath
          }
        })
      } else {
        // 登陆了
        console.log('已登录')
        const res = await cartAddSend(this.id, this.count, this.detail.skuList[0].goods_sku_id)
        console.log(res)
        this.totalCount = res.data.cartTotal
      }
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  img {
      display: block;
      width: 100%;
    }

  // 轮播图指示器
    .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }

  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }

}

.tips {
  padding: 10px;
}

 .content {
    padding: 16px 16px 16px 0px;
  }

.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

.footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    text-align: center;
    color: #fff;
    background-color: red;
    border-radius: 50%;
  }
}
</style>
