<template>
  <scroll-view scroll-y class="order-list">
    <div class="order-item">
      <div class="order-shop">
        <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-shop_order@2x.png'" class="home">
        <p class="order-name">
          爱撒娇是客服哈手机看啥都看房间爱离开宿舍
          <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
        </p>
        <p class="order-status">代付款</p>
      </div>
      <div class="order-msg">
        <img src="" class="order-pic">
        <div class="shop-content">
          <p class="shop-name">sadfsagfdjkaglkdfg;lkaj;lkgjklsdahgklhdsglhsdlgahlasafasfasfassafafasasshfjk</p>
          <p class="money">总计：<span class="price">¥99</span></p>
        </div>
      </div>
      <div class="order-status">
        <div class="order-type">砍价</div>
        <div class="btn">去付款</div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  export default {
    name: 'order-list',
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .order-list
    word-break: break-all
    height: 100vh
    background: $color-background
    box-sizing: border-box
    font-family: $font-family-regular
    .order-item
      width: 92vw
      box-sizing: border-box
      padding: 0px 10px 8px
      margin: 15px auto 0
      height: 195px
      background: $color-FFFFFF
      box-shadow: 0 0 10px 0 rgba(141, 151, 158, 0.20)
      border-radius: 6px
      .order-shop
        display: flex
        position: relative
        height: 45px
        align-items: center
        .home
          width: 18px
          height: 18px
        .order-name
          font-size: $font-size-16
          color: $color-1F1F1F
          margin-left: 5px
          position: relative
          padding-right: 15.5px
          width: 65%
          no-wrap()
          .way
            col-center()
            right: 0
            width: 5.5px
            height: 10.5px
        .order-status
          color: $color-D32F2F
          font-size: $font-size-14
          col-center()
          right: 0
      .order-msg
        display: flex
        padding: 15px 0 16px
        border-bottom-1px(#e0e0e0, dashed)
        border-top-1px(#e0e0e0, dashed)
        .order-pic
          height: 75px
          width: 75px
          padding-right: 10px
        .shop-content
          display: flex
          flex-direction: column
          justify-content: space-between
        .shop-name
          margin-top: -5px
          width: 60vw
          font-size: $font-size-16
          line-height: 21px
          font-family: $font-family-regular
          color: $color-1F1F1F
          no-wrap-plus(2)
        .money
          font-family: $font-family-regular
          line-height: 1
          color: $color-1F1F1F
          font-size: $font-size-14
          .price
            font-family: $font-family-medium

      .order-status
        align-items: center
        justify-content: space-between
        height: 44px
        display: flex
        .order-type
          font-size: $font-size-14
          color: $color-1F1F1F
        .btn
          manager-button-style()
</style>
