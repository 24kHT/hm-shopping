import { getAdressList } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      addressList: getAdressList()
    }
  },
  getters: {},
  mutations: {},
  actions: {}
}
