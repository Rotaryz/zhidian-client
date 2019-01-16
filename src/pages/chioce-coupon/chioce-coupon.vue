<template>
  <div class="browse-shop" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item :title="title"></head-item>
    <div class="coupon-list border-top-1px" v-if="checkoutCouponList.canUse.length">
      <div class="list-title">可用优惠券</div>
      <div class="list-content">
        <div class="can-use-item" v-for="(item, idx) in checkoutCouponList.canUse" :key="idx" @click="select(item)">
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
              <img v-if="imageUrl && selectCoupon.id && (item.id * 1 === selectCoupon.id * 1)" :src="imageUrl + '/zd-image/1.5/pic-pselected@2x.png'" class="right-btn" alt="">
              <div class="status-icon" v-if="!selectCoupon.id || item.id * 1 !== selectCoupon.id * 1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="coupon-list" v-if="checkoutCouponList.unUse.length">
      <div class="list-title">不可用优惠券</div>
      <div class="list-content">
        <div class="unuse-item" v-for="(item, idx) in checkoutCouponList.unUse" :key="idx">
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/1.5/pic-couponbg_ysx@2x.png'" class="coupon-bg">
          <div class="coupon-box disabled">
            <div class="coupon-top">
              <div class="top-left">
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
              <div class="top-right">
                <div class="right-msg">
                  <div class="msg-title">{{item.coupon_name}}</div>
                  <div class="msg-subtitle">{{item.range_type_str}}</div>
                  <div class="msg-time">{{item.start_at}}-{{item.end_at}}</div>
                </div>
                <div class="right-status"></div>
              </div>
            </div>
            <div class="coupon-down">不可用原因：{{item.unUseType == 1 ? item.range_type_str : item.condition_str}}</div>
          </div>
        </div>
      </div>
    </div>
    <Blank v-if="!checkoutCouponList.canUse.length && !checkoutCouponList.unUse.length"></Blank>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeadItem from 'components/head-item/head-item'
  import Blank from 'components/blank/blank'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'chioce-coupon',
    data() {
      return {
        image_url: this.$imageUrl,
        title: '选择优惠券',
        disabled: false
      }
    },
    methods: {
      ...mapActions([
        'setSelectCoupon'
      ]),
      select(item) {
        if (this.disabled) return
        this.disabled = true
        this.setSelectCoupon(Object.assign({}, item))
        setTimeout(() => {
          this.disabled = false
          this.$wx.navigateBack()
        }, 300)
      }
    },
    computed: {
      ...mapGetters([
        'checkoutCouponList',
        'selectCoupon'
      ])
    },
    components: {
      Blank,
      HeadItem
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .coupon-list
    padding: 0 15px
    .list-title
      line-height: 38px
      font-family: $font-family-regular
      color: $color-1F1F1F
      font-size: $font-size-14
    .list-content
      padding-bottom: 5px
      .can-use-item
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
            width: 134rpx
            display: flex
            justify-content: flex-end
            .right-btn
              width: 20px
              height: 20px
              margin-right: 15px
            .status-icon
              width: 20px
              height: 20px
              box-sizing: border-box
              border: 1.5px solid $color-ED2C2B
              border-radius: 50%
              margin-right: 15px

      .unuse-item
        position: relative
        width: 100%
        height: 0
        padding-bottom: 34.78%
        margin-bottom: 15px
        .coupon-bg
          position: absolute
          width: 100%
          height: 100%
          display: block
          z-index: 2
        .coupon-box
          position: absolute
          width: 100%
          height: 100%
          z-index: 3
          layout(column)
          box-sizing: border-box
          .coupon-top
            width: 100%
            height: 75.42%
            display: flex
            align-items: center
            .top-left
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
            .top-right
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
                width: 134rpx
                display: flex
                align-items: center
                justify-content: center
          .coupon-down
            width: 100%
            height: 24.58%
            display: flex
            align-items: center
            font-family: $font-family-regular
            font-size: $font-size-12
            color: $color-6E6E6E
            text-indent: 10px
        .disabled.coupon-box
          .coupon-top
            .top-left
              .left-money
                .money-icon, .money-txt, .discount-txt
                  color: $color-B1B1B1
              .left-txt
                color: $color-B1B1B1
            .top-right
              .right-msg
                .msg-title, .msg-subtitle, .msg-time
                  color: $color-B1B1B1

          .coupon-down
            color: $color-B1B1B1


</style>
