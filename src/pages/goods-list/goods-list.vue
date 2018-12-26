<template>
  <div class="goods-list-box" :style="{paddingTop: (pageHeadH + 40) + 'px'}">
    <head-item :title="title"></head-item>
    <div class="nav-head" :style="{top: pageHeadH + 'px'}">
      <div class="nav-item" v-for="(item, idx) in navList" :key="idx" @click="checkTab(item.name, idx)">
        <span class="nav-txt" :class="{'active' : sortName === item.name}">{{item.txt}}</span>
        <div class="sort-box" v-if="item.sort">
          <div class="arrow-up" :class="{'active' : sortName === item.name && sortType === 'asc'}"></div>
          <div class="arrow-down" :class="{'active' : sortName === item.name && sortType === 'desc'}"></div>
        </div>
      </div>
    </div>
    <div class="list-container">
      <ul class="goods-list">
        <li class="goods-item-box" v-for="(item, idx) in goodsList" :key="idx">
          <goods-item></goods-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import clearWatch from 'common/mixins/clear-watch'
  import imMixin from 'common/mixins/im-mixin'
  import HeadItem from 'components/head-item/head-item'
  import GoodsItem from 'components/goods-item/goods-item'
  const NAVS = [
    {txt: '综合', sort: false, name: 'default'},
    {txt: '销量', sort: true, name: 'sale_count'},
    {txt: '价格', sort: true, name: 'original_price'}
  ]

  export default {
    mixins: [clearWatch, imMixin],
    data() {
      return {
        title: '全部商品',
        navList: NAVS,
        sortName: 'default', // 排序名
        sortType: '', // 排序方式 asc 升序 desc 降序
        goodsList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        page: 1,
        limit: 10,
        hasMore: true,
        orderBy: {},
        tabIndex: 0
      }
    },
    created() {
    },
    methods: {
      // 跳详情
      navHandle(item) {
        let path = `${this.$route.path}/goods-detail?goodsId=${item.goodsId}`
        this.$router.push(path)
      },
      // 切换tab栏
      checkTab(name, idx) {
        if (this.tabIndex === idx && idx === 0) return
        // 样式
        if (name === NAVS[this.tabIndex].name) {
          this.sortType = this.sortType === 'desc' ? 'asc' : 'desc'
        } else {
          this.sortType = name === NAVS[1].name ? 'desc' : 'asc'
        }
        // 请求参数
        let orderBy = {}
        if (name !== NAVS[0].name) {
          orderBy[name] = this.sortType
        }
        this.orderBy = orderBy
        this.sortName = name
        this.tabIndex = idx
        this.page = 1
        this.hasMore = true
      }
    },
    components: {
      HeadItem,
      GoodsItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .goods-list-box
    .nav-head
      position: fixed
      left: 0
      right: 0
      width: 100%
      height: 40px
      display: flex
      background: $color-white
      z-index: 10
      .nav-item
        flex: 1
        line-height: 40px
        display: flex
        align-items: center
        justify-content: center
        .nav-txt
          font-family: $font-family-regular
          font-size: $font-size-14
          letter-spacing: 0.6px
          color: $color-1F1F1F
          &.active
            color: $color-ED2C2B
        .sort-box
          margin-left: 4px
          display: flex
          height: 40px
          flex-direction: column
          justify-content: center
          .arrow-up
            width: 0
            height: 0
            border-left: 3px solid transparent
            border-right: 3px solid transparent
            border-bottom: 4px solid $color-6E6E6E
            margin-bottom: 2px
            &.active
              border-bottom: 4px solid $color-ED2C2B
          .arrow-down
            width: 0
            height: 0
            border-left: 3px solid transparent
            border-right: 3px solid transparent
            border-top: 4px solid $color-6E6E6E
            &.active
              border-top: 4px solid $color-ED2C2B


    .list-container
      padding: 5px
      background: $color-background
      .goods-list
        display: flex
        flex-wrap: wrap
        .goods-item-box
          width: 49%
          padding-bottom: 2%
          &:nth-child(2n+1)
            margin-right: 2%


</style>
