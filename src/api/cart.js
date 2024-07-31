import request from '@/utils/request'

// 发送添加商品到购物车
export const cartAddSend = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车商品信息
export const getCartList = () => {
  return request.get('/cart/list')
}

// 购物车商品更新
export const cartUpdate = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车列表选中商品
export const sendSelDel = (ids) => {
  return request.post('/cart/clear', {
    cartIds: ids
  })
}
