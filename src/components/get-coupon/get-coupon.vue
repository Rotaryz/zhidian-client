<template>
  <div class="payment">
    <div class="payment-cover" v-show="orderShow" @click.top="hideOrder" @touchmove.parent=""></div>
    <div class="payment-content" :class="orderShow ? 'show' : ''" @click.stop="" @touchmove="">
      <div class="content-title border-bottom-1px">
        <span>领取优惠券</span>
        <div class="close-btn" @click="hideOrder">
          <img class="close-icon" :src="imageUrl + '/zd-image/mine/icon-del@2x.png'" v-if="imageUrl" alt="">
        </div>
      </div>
      <scroll-view scroll-y class="content-view" @scrolltolower="loadMore">
        <div class="coupon-list">
          <div class="coupon-item" v-for="(item, idx) in couponList" :key="item">
            <div class="item-left">
              <div class="left-money" v-if="item.coupon_type == 3">
                <span class="money-icon">¥</span>
                <span class="money-txt">{{item.denomination}}</span>
              </div>
              <div class="left-money" v-if="item.coupon_type == 4">
                <span class="money-txt">{{item.denomination}}</span>
                <span class="discount-txt">折</span>
              </div>
              <div class="left-txt">{{item.condition_str}}</div>
            </div>
            <div class="item-line"></div>
            <div class="item-right">
              <div class="right-msg">
                <div class="msg-title">{{item.coupon_name}}</div>
                <div class="msg-subtitle">{{item.range_type_str}}</div>
                <div class="msg-time">{{item.start_at}}-{{item.end_at}}</div>
              </div>
              <div class="right-status">
                <div class="right-btn" v-if="item.is_receive" @click="getCoupon(item, idx)">领取</div>
                <img class="status-img" v-if="imageUrl && !item.is_receive" :src="imageUrl + '/zd-image/1.5/pic-coupon_ylq@2x.png'" alt="">
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Goods } from 'api'
  export default {
    data() {
      return {
        imageUrl: this.$imageUrl,
        orderShow: false,
        couponList: [],
        page: 1,
        noMore: false
      }
    },
    created() {
    },
    onUnload() {
      this.orderShow = false
    },
    methods: {
      showOrder(reqGoodsId) {
        this.reqGoodsId = reqGoodsId
        this._getCouponList()
        this.orderShow = true
        this.noMore = false
      },
      hideOrder() {
        this.orderShow = false
      },
      loadMore() {
        if (this.noMore) return
        this.page++
        let data = {
          recommend_goods_id: this.reqGoodsId,
          page: this.page,
          limit: 15
        }
        Goods.getCouponList(data).then((res) => {
          this.$wx.hideLoading()
          if (res.error === this.$ERR_OK) {
            if (!res.data.length) {
              this.page--
              this.noMore = true
              return
            }
            this.couponList = [...this.couponList, ...res.data]
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      _getCouponList(loading = true) {
        let data = {
          recommend_goods_id: this.reqGoodsId,
          page: 1,
          limit: 15
        }
        Goods.getCouponList(data, loading).then((res) => {
          this.$wx.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.couponList = res.data
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      getCoupon(item, idx) {
        let data = {
          coupon_id: item.id
        }
        Goods.getCoupon(data).then((res) => {
          this.$wx.hideLoading()
          if (res.error === this.$ERR_OK) {
            this.$showToast('领取成功')
            if (res.data.has_receive_count <= 0) {
              this.couponList = this.couponList.map((item1) => {
                if (+item1.id === +item.id) {
                  item1 = Object.assign({}, item1, {is_receive: 0})
                }
                return item1
              })
              if (idx <= 2) {
                this.$emit('refresh')
              }
            }
          } else {
            this.$showToast(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .payment
    .payment-cover
      position: fixed
      left: 0
      top: 0
      bottom: 0
      right: 0
      z-index: 100
      background: rgba(31, 31, 31, 0.8)
    .payment-content
      position: fixed
      z-index: 150
      left: 0
      bottom: -130%
      width: 100%
      background: $color-white
      border-radius: 10px 10px 0 0
      box-sizing: border-box
      transition: all .3s
      .content-title
        height: 50px
        position: relative
        display: flex
        align-items: center
        justify-content: center
        font-family: $font-family-medium
        font-size: $font-size-16
        letter-spacing: 0.8px
        color: $color-1F1F1F
        .close-btn
          position: absolute
          right: 5px
          top: 0
          padding: 15px
          width: 12px
          height: 12px
          .close-icon
            width: 12px
            height: 12px
      .content-view
        height: 70vh
        .coupon-list
          padding: 20px 15px 0
          .coupon-item
            margin-bottom: 15px
            display: flex
            align-items: center
            height: 90px
            border: 1px solid rgba(237,43,43,0.10)
            border-radius: 3px
            background: rgba(237,43,43,0.05)
            .item-left
              width: 27%
              height: 100%
              display: flex
              flex-direction: column
              align-items: center
              justify-content: center
              .left-money
                display: flex
                align-items: flex-end
                margin-bottom: 5px
                .money-icon
                  font-family: $font-family-bold
                  font-size: $font-size-15
                  color: $color-1F1F1F
                  margin-bottom: 4px
                  line-height: 15px
                .money-txt
                  font-family: $font-family-bold
                  font-size: 35px
                  color: $color-1F1F1F
                  margin: 0 1px
                  line-height: 35px
                .discount-txt
                  font-family: $font-family-regular
                  font-size: $font-size-14
                  color: $color-1F1F1F
                  margin-bottom: 4px
                  line-height: 14px
              .left-txt
                font-family: $font-family-regular
                font-size: $font-size-11
                color: $color-1F1F1F
                line-height: 11px
            .item-line
              width: 1px
              height: 60px
              border-right: 1px dashed rgba(237,43,43,0.1)
            .item-right
              width: 73%
              height: 100%
              box-sizing: border-box
              padding-left: 4vw
              display: flex
              align-items: center
              .right-msg
                flex: 1
                overflow: hidden
                display: flex
                flex-direction: column
                justify-content: center
              .msg-title
                font-family: $font-family-medium
                font-size: $font-size-14
                color: $color-1F1F1F
                margin-bottom: 9px
                width: 100%
                line-height: 14px
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
              .msg-subtitle
                font-family: $font-family-regular
                font-size: $font-size-12
                color: $color-6E6E6E
                opacity: 0.8
                line-height: 12px
                margin-bottom: 7px
              .msg-time
                font-family: $font-family-regular
                font-size: $font-size-12
                color: $color-6E6E6E
                opacity: 0.8
                line-height: 12px
              .right-status
                width: 176rpx
                display: flex
                align-items: center
                justify-content: center
    .right-btn
      width: 120rpx
      height: 48rpx
      line-height: 48rpx
      font-family: $font-family-regular
      font-size: 24rpx
      color: $color-white
      text-align: center
      background-image: linear-gradient(135deg, #FF9377 0%, #FF3F3F 100%)
      border-radius: 24rpx
    .status-img
      display: block
      width: 72.5px
      height: 67.5px
    .show.payment-content
      bottom: 0

</style>
