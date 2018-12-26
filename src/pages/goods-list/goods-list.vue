<template>
  <div class="goods-list-box" :style="{paddingTop: (pageHeadH + 40) + 'px'}">
    <head-item :title="title"></head-item>
    <div class="nav-head" :style="{top: pageHeadH + 'px'}">
      <div class="nav-item" v-for="(item, idx) in navList" :key="idx" @click="checkTab(item.id, idx)">
        <span class="nav-txt" :class="{'active' : sort == item.id}">{{item.txt}}</span>
        <div class="sort-box" v-if="item.sort">
          <div class="arrow-up" :class="{'active' : sort == item.id && sortType === 'asc'}"></div>
          <div class="arrow-down" :class="{'active' : sort == item.id && sortType === 'desc'}"></div>
        </div>
      </div>
    </div>
    <div class="list-container">
      <ul class="goods-list">
        <li class="goods-item-box" v-for="(item, idx) in goodsList" :key="idx">
          <goods-item :item="item"></goods-item>
        </li>
      </ul>
    </div>
    <blank v-if="hasNone" styles="padding:50px 0"></blank>
  </div>
</template>

<script type="text/ecmascript-6">
  import clearWatch from 'common/mixins/clear-watch'
  import imMixin from 'common/mixins/im-mixin'
  import HeadItem from 'components/head-item/head-item'
  import GoodsItem from 'components/goods-item/goods-item'
  import Blank from 'components/blank/blank'
  import { Goods } from 'api'
  const NAVS = [
    {txt: '综合', sort: false, id: ''},
    {txt: '销量', sort: true, id: 2},
    {txt: '价格', sort: true, id: 1}
  ]

  export default {
    mixins: [clearWatch, imMixin],
    data() {
      return {
        title: '全部商品',
        navList: NAVS,
        sortType: '', // 排序方式 asc 升序 desc 降序
        goodsList: [],
        page: 1,
        limit: 10,
        hasMore: true,
        tabIndex: 0,
        sort: '',
        hasNone: false
      }
    },
    created() {
    },
    onLoad() {
      this.getList()
    },
    onReachBottom() {
      this.page++
      this.getList()
    },
    onPullDownRefresh() {
      this.page = 1
      this.getList(() => {
        this.$wx.stopPullDownRefresh()
      })
    },
    methods: {
      // 跳详情
      navHandle(item) {
        let path = `${this.$route.path}/goods-detail?goodsId=${item.goodsId}`
        this.$router.push(path)
      },
      // 切换tab栏
      checkTab(id, idx) {
        if (this.tabIndex === idx && idx === 0) return
        // 样式
        if (+id === NAVS[this.tabIndex].id) {
          this.sortType = this.sortType === 'desc' ? 'asc' : 'desc'
        } else {
          this.sortType = +id === NAVS[1].id ? 'desc' : 'asc'
        }
        // 请求参数
        this.sort = id
        this.tabIndex = idx
        this.page = 1
        this.hasMore = true
        this.$wechat.pageScrollTo()
        this.getList()
      },
      getList(callback) {
        if (!this.hasMore && !callback) return
        let data = {
          page: this.page,
          sort: this.sortType,
          limit: this.limit,
          sort_type: this.sort
        }
        Goods.getGoodsListBy(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error !== this.$ERR_OK) {
            this.$showToast(res.message)
            return
          }
          if (this.page > 1) {
            this.goodsList = [...this.goodsList, ...res.data]
          } else {
            this.goodsList = res.data
          }
          this.hasNone = !this.goodsList.length
          if (!res.data.length) {
            this.page--
            this.hasMore = false
          }
          callback && callback()
        })
      }
    },
    components: {
      HeadItem,
      GoodsItem,
      Blank
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .goods-list-box
    box-sizing: border-box
    background: $color-background
    min-height: 100vh
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
