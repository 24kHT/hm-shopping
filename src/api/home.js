import request from '@/utils/request'

// 首页渲染
export const getHome = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
