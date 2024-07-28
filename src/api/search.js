import request from '@/utils/request'

// 获取搜索到的商品列表
export const getSearchList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
