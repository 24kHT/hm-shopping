import request from '@/utils/request'

export const getDetailPro = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
