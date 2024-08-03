// 个人信息本地存储删除查看模块
const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'
const ADDRESS_KEY = 'hm_address_list'
const DEFAULT_KEY = 'hm_address_default_id'

// 本地存数据
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}
// 本地取数据
export const getInfo = () => {
  const res = localStorage.getItem(INFO_KEY)
  return res
    ? JSON.parse(res)
    : {
        userId: '',
        token: ''
      }
}
// 本地删除数据
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 本地存储搜索历史信息列表
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}

// 本地获取搜索历史信息列表
export const getHistoryList = () => {
  const arr = localStorage.getItem(HISTORY_KEY)
  return arr ? JSON.parse(arr) : []
}

// 本地存储地址列表
export const setAddressList = (arr) => {
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(arr))
}

// 获取本地地址列表
export const getAddressList = () => {
  const address = localStorage.getItem(ADDRESS_KEY)
  return address ? JSON.parse(address) : []
}

// 本地存储默认地址Id
export const setDefaultId = (id) => {
  localStorage.setItem(DEFAULT_KEY, JSON.stringify(id))
}

// 本地读取默认地址Id
export const getDefaultId = () => {
  const id = localStorage.getItem(DEFAULT_KEY)
  return id ? JSON.parse(id) : -1
}
