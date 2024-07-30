<template>
  <div class="count-box">
    <button class="minus" @click="subCount">-</button>
    <input class="inp" :value="value" @change="handleChange">
    <button class="add" @click="addCount">+</button>
  </div>
</template>

<script>
export default {
  name: 'countBox',
  props: {
    value: {
      type: Number,
      default: 1

    }
  },
  methods: {
    subCount () {
      if (this.value <= 0) { return }
      this.$emit('input', this.value - 1)
    },
    addCount () {
      if (this.value >= 999) { return }
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const count = +e.target.value
      if (isNaN(count) || count < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', count)
    }
  }

}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}

</style>
