<template>
  <div class="payment">
    <div class="payment-cover" v-show="orderShow" @click.top="hideOrder" @touchmove.parent=""></div>
    <div class="payment-content" :class="orderShow ? 'show' : ''" @click.stop="" @touchmove="">
      <div class="payment-top border-bottom-1px">
        <div class="payment-img-box">
          <img src="" class="payment-img">
        </div>
        <div class="payment-top-right">
          <div class="payment-title">国颐堂皇室养发套餐</div>
          <div class="payment-money">
            <span class="price-left"><span class="price-icon">¥</span><span class="big-money">99</span></span>
            <span class="del-money">599元</span>
          </div>
        </div>
      </div>
      <div class="payment-detail border-bottom-1px">
        <div class="detail-item">
          <div class="detail-title">数量</div>
          <div class="num-box">
            <div class="num-btn-box">
              <img :src="imageUrl + '/zd-image/mine/icon-subtract@2x.png'" v-if="imageUrl && orderNum > 1" class="num-btn">
              <img :src="imageUrl + '/zd-image/mine/icon-subtract_disable@2x.png'" v-if="imageUrl && orderNum <= 1" class="num-btn">
            </div>
            <div class="payment-num">{{orderNum}}</div>
            <div class="num-btn-box">
              <img :src="imageUrl + '/zd-image/mine/icon-add@2x.png'" v-if="imageUrl" class="num-btn">
              <img :src="imageUrl + '/zd-image/mine/icon-add_disable@2x.png'" v-if="imageUrl && false" class="num-btn">
            </div>
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-title">商品总额</div>
          <div class="payment-money"><span class="money-icon">¥</span>99</div>
        </div>
      </div>
      <div class="phone-auth">
        <div class="detail-title">手机号码</div>
        <div class="phone-right">
          <div class="phone-get-btn" v-if="false">
            <span class="get-btn-txt">授权获取</span>
            <img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" v-if="imageUrl" class="get-btn-icon">
          </div>
          <div class="phone-num">15164931877</div>
        </div>
      </div>
      <div class="buy-btn-box">
        <div class="buy-btn">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        imageUrl: this.$imageUrl,
        orderShow: true,
        orderNum: 1
      }
    },
    methods: {
      hideOrder() {
        this.orderShow = false
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
      background: rgba(31,31,31,0.8)
    .payment-content
      position: fixed
      z-index: 150
      left: 0
      bottom: -130%
      width: 100%
      background: $color-white
      border-radius: 10px 10px 0 0
      padding: 0 15px
      box-sizing: border-box
      transition: all .3s
      .payment-top
        position: relative
        height: 97px
        display: flex
        .payment-img-box
          width: 100px
          height: 100px
          border: 1px solid rgba(153,160,170,0.10)
          box-shadow: 0 4px 16px 0 rgba(55,75,99,0.10)
          border-radius: 12px
          position: absolute
          left: 15px
          bottom: 23px
          background: $color-white
          overflow: hidden
          .payment-img
            width: 100%
            height: 100%
        .payment-top-right
          margin-left: 130px
          flex: 1
          overflow: hidden
          padding-top: 15px
          .payment-title
            font-family: $font-family-medium
            font-size: 16px
            color: $color-1F1F1F
            letter-spacing: 0.6px
            margin-bottom: 17px
          .payment-money
            display: flex
            align-items: flex-end
            .price-left
              margin-right: 8px
              .price-icon
                font-family: $font-family-medium
                font-size: $font-size-12
                color: $color-455A64
                margin-right: 2px
              .big-money
                font-family: DINAlternate-Bold
                font-size: 26px
                color: $color-000028
            .del-money
              text-decoration: line-through
              font-family: $font-family-regular
              color: $color-99A0AA
              font-size: $font-size-14
      .payment-detail
        height: 126px
        .detail-item
          display: flex
          align-items: center
          justify-content: space-between
          height: 63px
          .detail-title
            font-family: $font-family-regular
            color: $color-1F1F1F
            font-size: $font-size-16
          .num-box
            display: flex
            align-items: center
            .num-btn-box
              width: 55px
              height: 32px
              .num-btn
                width: 100%
                height: 100%
            .payment-num
              width: 35px
              text-align: center
              font-family: $font-family-medium
              font-size: $font-size-18
              color: $color-1F1F1F
          .payment-money
            font-size: $font-size-20
            font-family: PingFang-SC-Bold
            color: $color-D32F2F
            letter-spacing: 0.6px
            .money-icon
              margin-right: 3px
      .phone-auth
        height: 66px
        margin-bottom: 10px
        display: flex
        align-items: center
        justify-content: space-between
        .detail-title
          font-family: $font-family-regular
          color: $color-1F1F1F
          font-size: $font-size-16
        .phone-right
          .phone-get-btn
            height: 30px
            padding-left: 10px
            display: flex
            align-items: center
            font-size: 0
            .get-btn-txt
              font-family: $font-family-regular
              color: $color-6E6E6E
              font-size: $font-size-16
              margin-right: 5px
            .get-btn-icon
              width: 7.5px
              height: 12.5px
          .phone-num
            font-family: $font-family-regular
            color: $color-1F1F1F
            font-size: $font-size-16
      .buy-btn-box
        padding: 15px 0
        .buy-btn
          height: 45px
          line-height: 44px
          font-size: $font-size-16
          font-family: $font-family-medium
          color: $color-white
          button-style(normal, 22.5px)
    .show.payment-content
      bottom: 0

</style>
