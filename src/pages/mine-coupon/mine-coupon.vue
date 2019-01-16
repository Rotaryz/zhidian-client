<template>
  <div class="exchange" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="true"></head-item>
    <section class="tab-container border-bottom-1px">
      <div class="tab-box">
        <ul class="tab-wrapper">
          <li class="tab-item" :class="{'active' : tabId == item.id}" v-for="(item, index) in tabList" :key="index" @click="changeTab(item.id)">{{item.title}}</li>
        </ul>
        <div class="tab-line-wrapper" :style="'transform: translate3d(' + tabId*100 + '%,0,0)'">
          <div class="tab-line"></div>
        </div>
      </div>
    </section>
    <div class="used-box">
      <div class="item" v-for="(item, index) in list" :key="index">
        <coupon-item @clickUsedBtn="clickUsedBtn" :couponInfo="item"></coupon-item>
      </div>
      <blank v-if="isNull"></blank>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CouponItem from 'components/new-coupon/new-coupon'
  import { Mine } from 'api'
  import CouponCode from 'components/coupon-code/coupon-code'
  import HeadItem from 'components/head-item/head-item'
  import clearWatch from 'common/mixins/clear-watch'
  import Blank from 'components/blank/blank'

  const tabList = [{ title: '未使用', id: 0 }, { title: '已使用', id: 1 }, { title: '已失效', id: 2 }]
  export default {
    mixins: [clearWatch],
    name: 'mine-coupon',
    data() {
      return {
        tabList,
        tabId: 0,
        list: [],
        page: 1,
        noMore: false,
        isNull: false,
        title: '优惠券'
      }
    },
    onLoad() {
      this._getList()
    },
    onReachBottom() {
      this._getMoreList()
    },
    methods: {
      changeTab(id) {
        if (+this.tabId === +id) return
        this.isNull = false
        this.tabId = +id
        this._getList()
      },
      _getList(loading = true) {
        this.page = 1
        this.noMore = false
        let data = {
          page: this.page,
          status: this.tabId,
          limit: 10
        }
        Mine.getCouponList(data, loading).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.list = res.data
            if (!res.data.length) {
              this.isNull = true
            }
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _getMoreList(loading = true) {
        if (this.noMore) return
        this.page++
        let data = {
          page: this.page,
          status: this.tabId,
          limit: 10
        }
        Mine.getCouponList(data, loading).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            if (!res.data.length) {
              this.noMore = true
              this.page--
              return
            }
            this.list = [...this.list, ...res.data]
          } else {
            this.$showToast(res.message)
          }
        })
      }
    },
    components: {
      CouponItem,
      CouponCode,
      Blank,
      HeadItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"
  .exchange
    min-height: 100vh
    background: $color-FFFFFF
    padding: 0 13px 15px
    box-sizing: border-box

  .tab-container
    height: 50px
    padding: 0 15px
    position: fixed
    line-height: 50px
    top: 64
    left: 0
    width: 100%
    z-index: 10
    box-sizing: border-box
    background: $color-FFFFFF
    .tab-box
      width: 100%
      height: 100%
      position: relative
      .tab-wrapper
        position: relative
        height: 100%
        width: 100%
        layout(row, block, nowrap)
        font-family: $font-family-regular
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.6px
        line-height: 1
        .tab-item
          flex: 1
          line-height: 47px
          text-align: center
          &.active
            font-family: $font-family-medium
      .tab-line-wrapper
        position: absolute
        width: (100/3)%
        height: 3px
        transform: translate3d(0, 0, 0)
        transition: all 0.3s
        bottom: 0
        .tab-line
          margin: 0 auto
          height: 3px
          width: 65px
          background: $color-ED2C2B
          border-radius: 3px

  .used-box
    padding-top: 65px
</style>
