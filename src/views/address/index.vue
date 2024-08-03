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
      <button class="btn"><van-icon name="add-o" class="add-icon" />添加收获地址</button>
    </div>
  </div>
</template>

<script>
import AddressBox from '@/components/AddressBox.vue'

export default {
  name: 'setAddressIndex',
  created () {
    console.log(this.addressList)
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
    font-size: 22px;
    .add-icon {
      font-size: 22px;
      vertical-align: middle;
    }
  }
}
</style>
