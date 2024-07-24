<template>
  <div id="app">
      <router-view></router-view>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      show: false
    }
  },
  methods: {
    showPopup () {
      this.show = true
    }
  }
}
</script>

<style lang="less">

</style>
