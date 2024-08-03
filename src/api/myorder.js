import request from '@/utils/request'

// 获取收获地址
export const getAddressList = () => {
  return request.get('/address/list', {
  })
}

// 获取默认收货地址id
export const getDefaultAddressId = () => {
  return request.get('/address/defaultId', {
  })
}
