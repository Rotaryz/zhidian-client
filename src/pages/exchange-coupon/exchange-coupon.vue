<template>
  <div class="exchange" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title" :showArrow="true"></head-item>
    <section class="tab-container">
      <div class="tab-box">
        <ul class="tab-wrapper">
          <li class="tab-item" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">{{item.title}}</li>
        </ul>
        <div class="tab-line-wrapper" :style="'transform: translate3d(' + selectTab*100 + '%,0,0)'">
          <div class="tab-line"></div>
        </div>
      </div>
    </section>
    <div class="used-box" v-if="selectTab * 1 === 0">
      <div class="item" v-for="(item, index) in unusedList" v-bind:key="index" v-if="unusedList">
        <coupon-item @clickUsedBtn="clickUsedBtn" :couponInfo="item"></coupon-item>
      </div>
      <blank v-if="isUnNull && unusedList.length * 1 === 0"></blank>
    </div>
    <div class="used-box" v-if="selectTab * 1 === 1">
      <div class="item" v-for="(item, index) in usedList" v-bind:key="index" v-if="usedList">
        <coupon-item :coupontype="1" :couponInfo="item"></coupon-item>
      </div>
      <blank v-if="isNull && usedList.length * 1 === 0"></blank>
    </div>
    <coupon-code ref="couponCode" @cancel="cancel"></coupon-code>
  </div>
</template>

<script type="text/ecmascript-6">
  import CouponItem from 'components/coupon-item/coupon-item'
  import { Shop } from 'api'
  import CouponCode from 'components/coupon-code/coupon-code'
  import HeadItem from 'components/head-item/head-item'
  import clearWatch from 'common/mixins/clear-watch'
  import Blank from 'components/blank/blank'
  import QrCodeUtil from 'common/js/util-qr-code'

  const tabList = [{ title: '未使用' }, { title: '不可用' }]
  export default {
    mixins: [clearWatch],
    name: 'exchange-coupon',
    data() {
      return {
        tabList,
        selectTab: 0,
        unusedList: [],
        unusedPage: 1,
        unusedMore: false,
        usedList: [],
        usedPage: 1,
        usedMore: false,
        couponDetail: {},
        isUnNull: false,
        isNull: false,
        title: '奖品券'
      }
    },
    onShow() {
      this.getUnusedList()
      this.getUsedList()
    },
    onReachBottom() {
      if (this.selectTab * 1 === 0) {
        this.getMoreUnusedList()
      } else {
        this.getMoreUsedList()
      }
    },
    methods: {
      async cancel() {
        this.couponDetail = {}
        this.getUnusedList(false)
        this.getUsedList(false)
      },
      changeTab(index) {
        if (this.selectTab === index) return
        this.selectTab = index
      },
      clickUsedBtn(item) {
        let qrCodeUrl = QrCodeUtil.createQrCodeSvg(item.qrcode)
        let obj = { name: item.goods_name, goods_image: item.image_url, time: item.end_at, qrcode_url: qrCodeUrl, code: item.code }
        this.$refs.couponCode.show(obj)
      },
      getUnusedList(loading) {
        this.unusedPage = 1
        this.unusedMore = false
        let data = {
          page: 1,
          status: 0,
          limit: 10
        }
        Shop.getCouponList(data, loading).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.unusedList = res.data
            this._isUnusedList(res)
            if (!res.data.length) {
              this.isUnNull = true
            }
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _isUnusedList(res) {
        this.unusedPage++
        if (this.unusedList.length >= res.meta.total * 1) {
          this.unusedMore = true
        }
      },
      getMoreUnusedList() {
        if (this.unusedMore) return
        let data = {
          page: this.unusedPage,
          status: 0,
          limit: 10
        }
        Shop.getCouponList(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.unusedList.push(...res.data)
            this._isUnusedList(res)
          } else {
            this.$showToast(res.message)
          }
        })
      },
      getUsedList(loading) {
        this.usedPage = 1
        this.usedMore = false
        let data = {
          page: 1,
          status: 1,
          limit: 10
        }
        Shop.getCouponList(data, loading).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.usedList = res.data
            this._isUsedList(res)
            if (!res.data.length) {
              this.isNull = true
            }
          } else {
            this.$showToast(res.message)
          }
        })
      },
      _isUsedList(res) {
        this.usedPage++
        if (this.usedList.length >= res.meta.total * 1) {
          this.usedMore = true
        }
      },
      getMoreUsedList() {
        if (this.usedMore) return
        let data = {
          page: this.usedPage,
          status: 1,
          limit: 10
        }
        Shop.getCouponList(data).then((res) => {
          this.$wechat.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.usedList.push(...res.data)
            this._isUsedList(res)
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
  .exchange
    min-height: 100vh
    background: $color-background
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
        font-family: $font-family-medium
        font-size: $font-size-16
        color: $color-1F1F1F
        letter-spacing: 0.6px
        line-height: 1
        .tab-item
          flex: 1
          line-height: 47px
          text-align: center
      .tab-line-wrapper
        position: absolute
        width: 50%
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
    padding-top: 60px
</style>
