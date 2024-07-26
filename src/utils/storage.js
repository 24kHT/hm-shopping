// 个人信息本地存储删除查看模块
const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'
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
