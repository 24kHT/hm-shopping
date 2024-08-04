<template>
  <div class="setAddress">

    <!-- 导航条 -->
    <van-nav-bar
  title="地址管理"
  left-text="返回"
  left-arrow
  @click-left="$router.back()"
/>

    <!-- 地址列表 -->
    <div class="address-list">
        <AddressBox v-for="item in addressList" :key="item.address_id" :item="item"></AddressBox>
    </div>
    <div class="btn-wrapper">
      <button class="btn" @click="handleAdd"><van-icon name="add-o" class="add-icon" />添加收货地址</button>
    </div>

    <!-- 弹窗新增地址 -->
    <van-dialog v-model="popShow" title="添加地址" show-cancel-button :before-close="handleClose">
     <van-form>
      <van-field
      v-model="username"
      name="姓名"
      label="姓名"
      placeholder="请输入收货人姓名"
    />
      <van-field
      v-model="phone"
      name="电话"
      label="电话"
      placeholder="请输入收货人电话"
    />
      <van-field
      v-model="address"
      name="收货地址"
      label="收货地址"
      placeholder="请输入收货地址"
    />
  <div style="margin: 16px;">
  </div>
</van-form>
    </van-dialog>
  </div>
</template>

<script>
// import { getAddressValue } from '@/api/address'
import AddressBox from '@/components/AddressBox.vue'

export default {
  name: 'setAddressIndex',
  async created () {
    console.log(this.addressList)
    // const res = await getAddressValue()
    // this.list = res.data.list
    console.dir(this.list)
    // 初始化keys列表
    this.createKeys()
  },
  components: {
    AddressBox
  },
  data () {
    return {
      popShow: false,
      list: {},
      keysList: [],
      pList: [],
      username: '',
      phone: '',
      address: ''

    }
  },
  computed: {
    addressList () {
      return this.$store.state.address.addressList
    }
  },
  methods: {
    handleAdd () {
      // console.log('add')
      this.popShow = true
    },
    handleClose (action, done) {
      if (action === 'confirm') {
        // 关闭前点击确认

        done()
      } else if (action === 'cancel') {
        // 关闭前点击取消done()
        done()
      }
    },
    createKeys () {
      // console.log(1)
      const keys = Object.keys(this.list)
      console.log(keys)
      keys.forEach(item => {
        this.pList.push(this.list[item].name)
      })
      console.log(this.pList)
    }
  }
}
</script>

<style lang="less" scoped>
.setAddress {
    height: 100vh;
    background-color: #ccc9c49d;
}
.btn-wrapper {
  position: relative;
  top: 10px;
  display: flex;
  justify-content: center;
  .btn {
    width: 90%;
    height: 36px;
    background-color: rgb(206, 46, 46);
    border: none;
    border-radius: 8px;
    color: rgb(236, 222, 222);
    font-size: 20px;
    .add-icon {
      font-size: 22px;
      vertical-align: middle;
    }
  }
}

select {
  height: 100px;
  .opt {
    display: block;
    height: 10px;
    font-size: 10px;
  }
}
</style>
