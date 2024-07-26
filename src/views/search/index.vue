<template>
  <div class="search">

    <!-- 导航栏 -->
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.back()"
    />

  <!-- 搜索 -->
  <van-search
    show-action
    placeholder="请输入搜索关键词"
    clearable
    v-model="search"
    @search="handleEnter"
    >
    <template #action>
      <div @click="goSearch(search)">搜索</div>
    </template>
  </van-search>

     <!-- 最近搜索 -->
      <div class="search-history" v-if="history.length>=1">
        <div class="title">
          <span>最近搜索</span>
          <van-icon name="delete-o"  size="16px" @click="clear"/>
        </div>
        <div class="list">
          <div class="list-item" v-for="item in history" :key="item" @click="goSearch(item)">{{ item }}</div>
        </div>
      </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'

export default {
  name: 'proDetailIndex',
  data () {
    return {
      history: getHistoryList(),
      search: ''
    }
  },
  methods: {
    // 动态把搜索内容放置在开头
    goSearch (key) {
      if (key === '') {
        return
      }
      // console.log(key)
      const index = this.history.indexOf(key)
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(key)
      setHistoryList(this.history)
    },
    clear () {
      this.history = []
      setHistoryList([])
    },
    handleEnter () {
      this.goSearch(this.search)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background-color: #fff;
    font-size: 13px;
    border: solid 1px #efefef;
    overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
      margin-bottom: 10px;
  }
}
</style>
