<template>
  <div class="cashing-coupon" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item title="领取优惠券" :showArrow="false"></head-item>
    <img class="top-bg" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/ai-2.1/pic-lqyhqbg@2x.png'" alt="">
    <article class="bottom-wrapper">
      <img class="bottom-bg" mode="widthFill" v-if="imageUrl" :src="imageUrl + '/zd-image/ai-2.1/pic-bgup@2x.png'" alt="">
      <div class="bottom-empty"></div>
      <article class="container">
        <div class="coupon">
          <discount-coupon></discount-coupon>
        </div>
        <div class="line" :style="{backgroundImage: imageUrl && 'url(' + imageUrl+ '/zd-image/ai-2.1/pic-wire@2x.png)'}"></div>
        <!--<div class="explain">优惠券已放入账号</div>-->
        <div class="button take" @click="takeHandle">马上领取</div>
        <div class="button use" @click="useHandle">立即使用</div>
      </article>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeadItem from 'components/head-item/head-item'
  import DiscountCoupon from './discount-coupon/discount-coupon'

  const PAGE_NAME = 'CASHING_COUPON'
  export default {
    name: PAGE_NAME,
    components: {
      HeadItem,
      DiscountCoupon
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      takeHandle() {
        // this.$refs.wxcode && this.$refs.wxcode.show()
      },
      useHandle() {
        this.$wx.switchTab({url: '/pages/shop'})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .cashing-coupon
    position :relative
    .top-bg
      width :100vw
      height :96.39999999999999vw
    .bottom-wrapper
      position :absolute
      left :0
      right :0
      top:97.46666666666667vw
      height :94.66666666666667vw
      overflow hidden
      .bottom-bg
        position absolute
        top: -14px
        width :100%
        height :110%
      .bottom-empty
        height :15.733333333333333vw
      .container
        position :relative
        margin :0 4vw
        height :73.33333333333333vw
        background:rgba(255,255,255,.6)
        border-radius: 1.6vw
        box-sizing :border-box
        padding :5.733333333333333vw 4vw  6.800000000000001vw
        layout(column, block,nowrap)
        justify-content space-between
        align-items :center
        .coupon
          width :100%
          height :22.666666666666664vw
        .line
          width :100%
          height :1px
          background-size :100% 100%
          background-position :center center
        .explain
          font-family: $font-family-regular
          font-size: 4vw
          color: #333333;
        .button
          height :10.666666666666668vw
          width :100%
          background: #F94346;
          border-radius: 1.6vw
          font-family: $font-family-regular
          line-height :@height
          font-size: 4.8vw
          color: #FFFFFF;
          text-align: center;
          box-sizing :border-box
          &.take
            margin-top :1.3333333333333335vw
          &.use
            border: 2px solid #F94346;
            color:#F94346;
            background :transparent
</style>
