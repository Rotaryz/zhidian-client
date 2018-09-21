<template>
  <div class="coupon-code" v-if="isShow" :animation="maskAnimation" @click="cancel">
    <div class="content" :animation="modalAnimation">
      <img mode="widthFix" :src="imageUrl + '/zd-image/mine/pic-coupon_code@2x.png'" class="content-image">
      <div class="shop-msg">
        <div class="shop-header-box">
          <img v-if="couponMsg.goods_image" :src="couponMsg.goods_image" class="shop-header">
        </div>
        <div class="shop-content">
          <p class="shop-name">{{couponMsg.name}}</p>
          <p class="shop-time">有效期至 {{couponMsg.time}}</p>
        </div>
        <img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
      </div>
      <div class="code-box">
        <img :src="couponMsg.qrcode_url" v-if="couponMsg.qrcode_url" class="code">
      </div>
      <div class="code-num">{{couponMsg.code}}</div>
      <p class="code-tip">该券码用于线下门店核销使用</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'coupon-code',
    props: {
      couponMsg: {
        type: Object,
        default: { image_url: '' }
      }
    },
    data() {
      return {
        isShow: false,
        maskAnimation: '',
        modalAnimation: '',
        imageUrl: this.$imageUrl
      }
    },
    onLoad() {
      this.isShow = false
    },
    methods: {
      show() {
        let modalAnimation = this.$parent.$wx.createAnimation({
          duration: 500,
          timingFunction: 'cubic-bezier(1, -0.07, 0.51, 1.48)',
          delay: 0
        })
        let maskAnimation = this.$parent.$wx.createAnimation({
          duration: 500,
          timingFunction: 'linear',
          delay: 0
        })
        maskAnimation.opacity(0).step()
        modalAnimation.scale(0.3).step()
        this.maskAnimation = maskAnimation.export()
        this.modalAnimation = modalAnimation.export()
        this.isShow = true
        setTimeout(() => {
          maskAnimation.opacity(1).step()
          modalAnimation.scale(1).step()
          this.maskAnimation = maskAnimation.export()
          this.modalAnimation = modalAnimation.export()
        }, 200)
      },
      cancel() {
        let modalAnimation = this.$parent.$wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        let maskAnimation = this.$parent.$wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
          delay: 0
        })
        maskAnimation.opacity(0).step()
        modalAnimation.scale(0.3).step()
        this.maskAnimation = maskAnimation.export()
        this.modalAnimation = modalAnimation.export()
        setTimeout(() => {
          maskAnimation.opacity(1).step()
          modalAnimation.scale(1).step()
          this.maskAnimation = maskAnimation.export()
          this.modalAnimation = modalAnimation.export()
          this.isShow = false
        }, 300)
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .coupon-code
    z-index: 100
    background: $color-mask-bgc
    word-break: break-all
    fill-box()
    display: flex
    align-items: center
    justify-content: center

  .content
    position: relative
    height: 110.8vw
    width: 84vw
    .content-image
      position: absolute
      height: 100%
      width: 100%
      z-index: 1
      top: 0
      left: 0
    .shop-msg
      position: relative
      z-index: 2
      height: 31.2vw
      padding: 25px 20px
      box-sizing: border-box
      display: flex
      .shop-header-box
        height: 17.87vw
        width: @height
        margin-right: 10px
      .shop-header
        background: $color-background
        height: 17.87vw
        width: @height
      .shop-content
        height: 17.87vw
        display: flex
        flex-direction: column
        justify-content: space-between
        .shop-name
          margin-top: -5px
          width: 46.67vw
          font-size: $font-size-16
          line-height: 21px
          font-family: $font-family-regular
          color: $color-1F1F1F
          no-wrap-plus(2)
        .shop-time
          font-family: $font-family-regular
          line-height: 1
          color: $color-99A0AA
          font-size: $font-size-12
      .way
        position: absolute
        col-center()
        right: 20px
        width: 5.5px
        height: 9px
    .code-box
      height: 37.07vw
      width: @height
      margin: 9.87vw auto
      .code
        height: 37.07vw
        width: @height
        z-index: 2
        position: relative
        display: block
    .code-num
      color: $color-1F1F1F
      font-size: $font-size-20
      font-family: $font-family-medium
      position: relative
      z-index: 2
      border-radius: 13px
      background: $color-F4F5F7
      margin: 5.467vw auto 0
      width: 44vw
      height: 26px
      line-height: 26px
      text-align: center
    .code-tip
      font-size: $font-size-12
      font-family: $font-family-regular
      color: $color-99A0AA
      position: relative
      z-index: 2
      text-align: center
      margin: 3.467vw auto 0
</style>
