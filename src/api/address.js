import request from '@/utils/request'

export const getAddressValue = () => {
  return request.get('/region/tree', {
  })
}
