<template>
  <div class="cashing-coupon" :style="{paddingTop: pageHeadH + 'px'}">
    <head-item title="领取优惠券" :showArrow="false"></head-item>
    <img class="top-bg" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/ai-2.1/pic-lqyhqbg@1x.png'" alt="">
    <article class="bottom-wrapper">
      <img class="bottom-bg" v-if="imageUrl" :src="imageUrl + '/zd-image/ai-2.1/pic-bgup@2x.png'" alt="">
      <div class="bottom-empty"></div>
      <article class="container">
        <div class="coupon">
          <discount-coupon></discount-coupon>
        </div>
        <div class="line" :style="{backgroundImage: imageUrl && 'url(' + imageUrl+ '/zd-image/ai-2.1/pic-wire@2x.png)'}"></div>
        <div class="explain">优惠券已放入账号</div>
        <div class="button" @click="submitHandle">立即使用</div>
      </article>
    </article>
    <modal-coupon ref="coupon"></modal-coupon>
    <modal-wxcode ref="wxcode"></modal-wxcode>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeadItem from 'components/head-item/head-item'
  import DiscountCoupon from './discount-coupon/discount-coupon'
  import ModalCoupon from 'components/modal-coupon/modal-coupon'
  import ModalWxcode from 'components/modal-wxcode/modal-wxcode'
  const PAGE_NAME = 'CASHING_COUPON'
  export default {
    name: PAGE_NAME,
    components: {
      HeadItem,
      DiscountCoupon,
      ModalCoupon,
      ModalWxcode
    },
    data() {
      return {

      }
    },
    methods: {
      submitHandle() {
        // this.$refs.coupon && this.$refs.coupon.show({})
        this.$refs.wxcode && this.$refs.wxcode.show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .cashing-coupon
    fill-box(fixed)
    background-image: linear-gradient(180deg, #FDA12E 0%, #FF4D29 100%);
    overflow :hidden
    .top-bg
      width :100vw
      height :96.39999999999999vw
    .bottom-bg
      position :absolute
      width :100vw
      height :82vw
    .bottom-wrapper
      position :relative
      top: -23.200000000000003vw
      .bottom-empty
        height :20.266666666666666vw
      .container
        position :relative
        margin :0 4vw
        height :62.133333333333326vw
        background:rgba(255,255,255,.6)
        border-radius: 1.6vw
        box-sizing :border-box
        padding :21.5px 15px  25.5px
        layout(column, block,nowrap)
        justify-content space-between
        align-items :center
        .coupon
          width :100%
          height :85px
        .line
          width :100%
          height :1px
          background-size :100% 100%
          background-position :center center
        .explain
          font-family: $font-family-regular
          font-size: 15px;
          color: #333333;
        .button
          height :40px
          width :100%
          background: #F94346;
          border-radius: 6px;
          font-family: $font-family-regular
          line-height :@height
          font-size: 18px;
          color: #FFFFFF;
          text-align: center;
</style>
