import { getDefaultAddressId } from '@/api/myorder'
import { getAddressList } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      addressList: getAddressList(), // 默认从本地存储获取地址列表
      defaultId: 1,
      defaultAddress: {}
    }
  },
  mutations: {
    setDefaultAddress (state, obj) {
      state.defaultAddress = obj
    }
  },
  getters: {
  },
  actions: {
    async defaultIdAction (context) {
      const { data: { defaultId } } = await getDefaultAddressId()
      return defaultId
    },
    // 获取默认地址
    async defaultAddressAction (context) {
      const id = await context.dispatch('defaultIdAction')
      const item = context.state.addressList.find((item) => {
        return item.address_id === id
      })
      context.commit('setDefaultAddress', item)
      return context.state.defaultAddress
    }
  }
}
