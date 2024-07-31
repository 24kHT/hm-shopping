import { cartUpdate, getCartList, sendSelDel } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },

    // 小选
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find((item) => {
        return item.goods_id === goodsId
      })
      goods.isChecked = !goods.isChecked
    },

    // 全选反选
    toggleCheckedAll (state, flag) {
      // console.log(flag)
      state.cartList.forEach(item => {
        item.isChecked = !item.isChecked
      })
    },

    // 修改购物车商品数量
    changeCount (state, { goodsId, value }) {
      const goods = state.cartList.find((item) => {
        return item.goods_id === goodsId
      })
      goods.goods_num = value
    },

    // 选择初始化
    resetSel (state) {
      state.cartList.forEach((item) => {
        item.isChecked = false
      })
    }
  },
  getters: {
    // 购物车的商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => {
        return sum + item.goods_num
      }, 0)
    },

    // 购物车勾选的商品列表
    selCart (state) {
      return state.cartList.filter((item) => {
        return item.isChecked === true
      })
    },

    // 购物车勾选的商品总数
    selTotal (state, getters) {
      return getters.selCart.reduce((sum, item) => {
        return sum + item.goods_num
      }, 0)
    },

    // 商品总价
    selPrice (state, getters) {
      return getters.selCart.reduce((sum, item) => {
        return sum + (item.goods_num * item.goods.goods_price_min)
      }, 0).toFixed(2)
    },

    // 是否全选状态
    isCheckedAll (state, getters) {
      if (getters.selTotal === getters.cartTotal) {
        return true
      } else {
        return false
      }
    }

  },
  actions: {
    // 获取购物车商品列表
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach((item) => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },

    // 修改购物车商品数量
    async changeCountAction (context, obj) {
      const { value, goodsId, skuId } = obj
      // 修改前端数据
      context.commit('changeCount', { goodsId, value })
      // 修改后端数据
      const res = await cartUpdate(goodsId, value, skuId)
      console.log(res)
    },

    // 后端删除选中的商品
    async selDel (context) {
      const ids = context.getters.selCart.map((item) => {
        return item.id
      })
      const res = await sendSelDel(ids)
      console.log(res)
      context.dispatch('getCartAction')
    }

  }
}
