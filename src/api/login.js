// 登录页有关的请求函数
import request from '@/utils/request'

// 获取图片验证码
export const getCode = () => {
  return request.get('/captcha/image')
}

// 获取短信验证码
export const getVeriCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 短信登录
export const mobileLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
