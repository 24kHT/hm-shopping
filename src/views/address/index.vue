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
        <AddressBox></AddressBox>
        <AddressBox></AddressBox>
        <AddressBox></AddressBox>
    </div>
  </div>
</template>

<script>
import AddressBox from '@/components/AddressBox.vue'

export default {
  name: 'setAddressIndex',
  created () {
    // console.log(this.addressList)
  },
  components: {
    AddressBox
  },
  data () {
    return {

    }
  },
  computed: {
    addressList () {
      return this.$store.state.address.addressList
    }
  }
}
</script>

<style lang="less" scoped>
.setAddress {
    height: 100vh;
    background-color: #ccc9c49d;
}
</style>
