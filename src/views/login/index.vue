<template>
  <div>
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.back()"/>
    <!-- 登陆页面主体内容 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" type="text" placeholder="请输入手机号码" v-model="mobile">
        </div>
        <div class="form-item">
          <input class="inp" type="text" placeholder="请输入图形验证码" v-model="picCode">
          <img v-if="picUrl" :src="picUrl" @click="getCode" alt="">
        </div>
        <div class="form-item">
          <input class="inp" type="text" placeholder="请输入短信验证码" v-model="smsCode">
          <button @click="getVeriCode">{{ totalSecond===second?'获取验证码':second+'后重新获取' }}</button>
        </div>

      </div>

      <div class="login-btn" @click="handleLogin">
        登录
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'

import { getCode, getVeriCode, mobileLogin } from '@/api/login'
import { setInfo } from '@/utils/storage'

export default {
  name: 'loginIndex',
  data () {
    return {
      picUrl: '', // 验证码图片地址
      picKey: '', // 验证码的key
      picCode: 'abcd', // 用户输入的验证码
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '13123456789',
      smsCode: ''
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    async getCode () {
      const res = await getCode()
      // console.log(res)
      const { data: { base64, key } } = res
      this.picUrl = base64
      this.picKey = key
    },

    // 判断是否可以发送短信验证码函数
    judgeGetCode () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        Toast.fail('请输入正确的手机号')
        return false
      }
      if (!/^[a-zA-Z0-9]{4}$/.test(this.picCode)) {
        Toast.fail('请输入正确的验证码')
        return false
      }
      return true
    },
    async getVeriCode () {
      if (this.timer !== null) {
        return false
      }
      // 验证是否满足请求获取验证码的条件，信息填写正确
      if (!this.judgeGetCode()) {
        return
      }
      // 发送获取短信验证码请求
      const res = await getVeriCode(this.picCode, this.picKey, this.mobile)
      console.log(res)
      Toast('短信发送成功')
      this.timer = setInterval(() => {
        this.second--
        if (this.second < 1) {
          clearInterval(this.timer)
          this.timer = null
          this.second = this.totalSecond
        }
      }, 1000)
    },
    async handleLogin () {
      // 验证验证码
      if (!this.judgeGetCode()) {
        Toast('请输入正确的信息')
        return
      }
      if (!/^[0-9]{6}$/.test(this.smsCode)) {
        Toast('请输入正确的6位验证码')
        return
      }
      const res = await mobileLogin(this.mobile, this.smsCode)
      console.log(res)
      // vuex保存用户唯一标识和鉴权码
      this.$store.commit('user/setUserInfo', res.data)
      // 持久化存储
      setInfo(res.data)
      // 跳转的页面
      const pathUrl = this.$route.query.backUrl || '/'
      this.$router.replace(pathUrl)
    }
  }
}
</script>

<style lang="less">
  .container {
    // background-color: pink;
    padding: 49px 29px;
    .title {
      margin-bottom: 30px;
      h3 {
        font-size: 30px;
        font-weight: normal;                                                                                                                                                                                                                                                                                                                                                                                                          ;
      }
      p {
        margin-top: 10px;
        font-size: 14px;
        color: #C4C4C4;
      }
    }

    .form {

      .form-item {
        // background-color: green;
        height: 79px;
        border-bottom: 1px solid #f1eeee;
        padding-top: 42px;
        padding-left: 10px;
        position: relative;
        .inp {
          height: 20px;
          border: none;
          font-size: 14px;
        }
        img {
          position: absolute;
          margin-left: 10px;
          top:34px;
          right: 10px;
          width: 100px;
          height: 31px;
        }
        button {
          position: absolute;
          right: 20px;
          border: none;
          background-color: #FFFFFF;
          font-size: 13px;
          color: #c7832a;
        }
      }
    }
// 57 -> 73  16
// F4B232 -> FF950C
    .login-btn {
      height: 41px;
      margin-top: 36px;
      border-radius: 28px;
      background: linear-gradient(90deg,#F4B232,#FF950C);
      text-align: center;
      line-height: 41px;
      color: #FFFFFF;
    }
  }
</style>
