<template>
  <div class="order-result">
    <img :src="imageUrl + '/zd-image/mine/pic-bg_pay@2x.png'" v-if="imageUrl" mode="widthFix" class="result-top-bc">
    <div class="result-content">
      <div class="result-box">
        <div class="avatar-box">
          <img :src="orderResultMsg ? orderResultMsg.avatar : ''" class="avatar">
        </div>
        <div class="shop-title">您在{{orderResultMsg ? orderResultMsg.nickName : ''}}</div>
        <div class="success-box">
          <div class="success-icon-box" :class="allReady ? 'show' : ''">
            <img :src="imageUrl + '/zd-image/mine/icon-payok@2x.png'" v-if="imageUrl" class="success-icon back">
            <img :src="imageUrl + '/zd-image/mine/icon-payment@2x.png'" v-if="imageUrl" class="success-icon front">
          </div>
          <div class="success-txt">{{allReady ? '支付成功' : '支付中···'}}</div>
        </div>
        <div class="result-down">
          <div class="down-txt">感谢您在{{orderResultMsg ? orderResultMsg.nickName : ''}}购买</div>
          <div class="down-txt">商品，请到线下门店核销使用！</div>
        </div>
      </div>
      <div class="down-btn-box">
        <button open-type="share" hover-class="none" class="share-btn" v-if="type * 1 === 1">转发好友</button>
        <div class="order-btn-box" v-if="type * 1 !== 1">
          <div class="order-btn black" @click="toShop">继续购物</div>
          <div class="order-btn red" @click="toDetail">查看订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'OrderResult',
    data () {
      return {
        imageUrl: this.$imageUrl,
        type: 0,
        orderId: '',
        allReady: false,
        timer: ''
      }
    },
    methods: {
      toShop() {
        if (!this.allReady) return
        let url = '/pages/guide'
        wx.switchTab({url})
      },
      toDetail() {
        if (!this.allReady) return
        let url = '/pages/order-detail?id=' + this.orderId
        wx.navigateTo({url})
      }
    },
    onLoad(option) {
      this.orderId = option.orderId
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.allReady = true
      }, 1700)
    },
    onUnload() {
      this.allReady = false
    },
    computed: {
      ...mapGetters([
        'orderResultMsg'
      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"
  .order-result
    width: 100vw
    height: 100vh
    background: $color-F8F8F8
    position: relative
    .result-top-bc
      width: 100%
      display: flex
    .result-content
      width: 80vw
      height: 100vh
      position: absolute
      left: 10vw
      top: 0
      display: flex
      flex-direction: column
      justify-content: center
      .result-box
        width: 100%
        height: 73vh
        background: $color-white
        border: 0.5px solid rgba(236,237,241,0.58)
        box-shadow: 0 4px 16px 0 rgba(55,75,99,0.10)
        border-radius: 6px
        box-sizing: border-box
        position: relative
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center
        .avatar-box
          position: absolute
          width: 80px
          height: 80px
          border: 2px solid $color-white
          border-radius: 50%
          left: 50%
          top: -35px
          transform: translate(-50%)
          box-shadow: 0 4px 16px 0 rgba(55,75,99,0.10)
          .avatar
            width: 100%
            height: 100%
            border-radius: 50%
            background: #ccc
        .shop-title
          margin-top: 65px
          font-family: PingFangSC-Regular
          font-size: $font-size-16
          color: #374B63
          letter-spacing: 0.6px
        .success-box
          .success-icon-box
            width: 82px
            height: 82px
            position: relative
            transform-style: preserve-3d
            transition: all .3s
            .success-icon
              width: 82px
              height: 82px
              position: absolute
              left: 0
              top: 0
              background: $color-white
            .front
              transform: rotateY(0deg)
            .back
              transform: rotateY(-180deg)
          .success-icon-box.show
            transform: rotateY(180deg)
          .success-txt
            font-family: PingFangSC-Regular
            font-size: $font-size-18
            color: $color-6E6E6E
            text-align: center
            letter-spacing: 0.68px
        .result-down
          margin-bottom: 45px
          .down-txt
            text-align: center
            font-family: PingFangSC-Regular
            font-size: $font-size-14
            color: $color-6E6E6E
            letter-spacing: 0.3px
            line-height: 21px


      .down-btn-box
        height: 13.5vh
        width: 100%
        position: absolute
        left: 0
        bottom: 0
        display: flex
        justify-content: center
        align-items: center
        .share-btn
          width: 200px
          height: 32px
          line-height: 32px
          text-align: center
          border-radius: 16px
          background: #F94C5F
          box-shadow: 0 4px 16px 0 rgba(249,76,95,0.30)
          font-family: PingFangSC-Regular
          font-size: $font-size-14
          color: #FFFFFF
          letter-spacing: 0.6px
          &:before, &:after
            border: 0 none
        .order-btn-box
          display: flex
          align-items: center
          .order-btn
            width: 100px
            height: 32px
            box-sizing: border-box
            text-align: center
            line-height: 32px
            border-radius: 16px
            font-family: PingFangSC-Regular
            font-size: $font-size-14
            letter-spacing: 0.6px
          .black
            border: 1px solid $color-D32F2F
            color: $color-D32F2F
            margin-right: 30px
            line-height: 30px
          .red
            color: $color-white
            background-image: linear-gradient(-90deg, #D32F2F 0%, #EB5C5C 100%)
</style>
