<template>
  <div class="address-box">
    <div class="header">
        {{ item.name }}，{{ item.phone }}
    </div>
    <div class="content">
        浙江省杭州市sidytaduiadjfygadfuyjgy11111111211111111111111111111111111111爱国
    </div>
    <van-divider :style="{ borderColor: 'blueviolet',margin: '5px 0px'}"></van-divider>
    <div class="footer">
        <van-checkbox v-model="checked">默认</van-checkbox>
    </div>
    </div>
</template>

<script>
export default {
  name: 'addressBox',
  props: {
    item: {
      type: Object
    }
  },
  created () {
    console.log(this.item)
  },
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style lang="less" scoped>
.address-box {
    margin: 3px 5px 8px 5px;
    padding: 2px;
    background-color: #f5f5f5;
    overflow-wrap: break-word;
    border-radius: 12px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .header {

    }
    .content {

    }
    .footer {

    }
}

</style>
