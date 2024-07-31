import { getCartList } from '@/api/cart'

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
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach((item) => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    }
  }
}
