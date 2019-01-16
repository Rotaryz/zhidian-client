<template>
  <div class="coupon-item">
    <img v-if="imageUrl && !couponInfo.status" :src="imageUrl + '/zd-image/1.5/pic-couponbg@2x.png'" class="coupon-bg">
    <img v-if="imageUrl && couponInfo.status" :src="imageUrl + '/zd-image/1.5/pic-couponbg_ysx@2x.png'" class="coupon-bg">
    <div class="coupon-box" :class="{'disabled' : couponInfo.status}">
      <div class="coupon-top">
        <div class="top-left">
          <div class="left-money" v-if="couponInfo.coupon_type == 3">
            <span class="money-icon">¥</span>
            <span class="money-txt">{{couponInfo.denomination}}</span>
          </div>
          <div class="left-money" v-if="couponInfo.coupon_type == 4">
            <span class="money-txt">{{couponInfo.denomination}}</span>
            <span class="discount-txt">折</span>
          </div>
          <div class="left-txt">{{couponInfo.condition_str}}</div>
        </div>
        <div class="top-right">
          <div class="right-msg">
            <div class="msg-title">{{couponInfo.coupon_name}}</div>
            <div class="msg-subtitle">{{couponInfo.range_type_str}}</div>
            <div class="msg-time">{{couponInfo.start_at}}-{{couponInfo.end_at}}</div>
          </div>
          <div class="right-status">
            <div class="right-btn" v-if="!couponInfo.status" @click="useCoupon(couponInfo)">立即使用</div>
            <img class="status-img" v-if="imageUrl && couponInfo.status == 1" :src="imageUrl + '/zd-image/1.5/pic-coupon_ysy@2x.png'" alt="">
            <img class="status-img" v-if="imageUrl && couponInfo.status == 2" :src="imageUrl + '/zd-image/1.5/pic-coupon_ygq@2x.png'" alt="">
          </div>
        </div>
      </div>
      <div class="coupon-down">使用店铺: {{couponInfo.shop_name}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'coupon-item',
    props: {
      couponInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        status: 0
      }
    },
    methods: {
      async useCoupon(item) {
        await this.$turnShop({ id: item.shop_id, url: '/pages/shop' })
        this.$emit('goBack')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .coupon-item
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
            width: 176rpx
            display: flex
            align-items: center
            justify-content: center
            .right-btn
              width: 132rpx
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
