import request from '@/utils/request'

// 获取商品分类信息
export const getCategory = () => {
  return request.get('/category/list', {
  })
}
