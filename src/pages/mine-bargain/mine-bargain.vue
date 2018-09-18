<template>
  <scroll-view scroll-y class="order-list">
    <div class="order-item">
      <div class="order-shop">
        <p class="order-name">2018-05-18 10:58</p>
        <p class="order-status">倒计时:142天58时10分36</p>
      </div>
      <div class="order-msg">
        <img src="" class="order-pic">
        <div class="shop-content">
          <p class="shop-name">sadfsagfdjkaglkdfg;lkaj;lkgjklsdahgklhdsglhsdlgahlasafasfasfassafafasasshfjk</p>
          <p class="shop-price">￥45</p>
          <div class="mine-serve-avatar-box">
            <div class="mine-serve-avatarBox-item" v-for="(items, idx) in header" :key="idx">
              <img class="mine-serve-avatarBox-img">
            </div>
            <div class="more">
              <span class="more-item"></span>
              <span class="more-item"></span>
              <span class="more-item"></span>
            </div>
            <span class="shop-num">1家</span>
          </div>
        </div>
      </div>
      <div class="order-status">
        <div class="order-type">砍价中</div>
        <div class="border-btn">
          <div class="btn-one">找人帮砍</div>
          <div class="btn">立即购买</div>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  export default {
    name: 'order-list',
    data() {
      return {
        header: [1, 1, 1, 1, 1, 1]
      }
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
        justify-content: space-between
        color: $color-455A64
        font-size: $font-size-14
        white-space: nowrap
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
          no-wrap()
        .shop-price
          color: $color-455A64
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
          color: $color-D32F2F
        .border-btn
          display: flex
          .btn
            margin-left: 10px
            manager-button-style()
          .btn-one
            width: 77px
            font-family: $font-family-regular
            font-size: $font-size-12
            border-radius: 15px
            text-align: center
            line-height: 29px
            height: 29px
            border-1px($color-6E6E6E, 15px)
            color: $color-6E6E6E

  .mine-serve-avatar-box
    display: flex
    margin-right: 10.5px
    align-items: center

  .shop-num
    font-size: $font-size-14
    margin-left: 5px
    color: $color-99A0AA
    line-height: 1

  .mine-serve-avatarBox-item
    width: 23px
    height: 23px
    box-sizing: border-box
    border-radius: 50%
    margin-right: -11px
    .mine-serve-avatarBox-img
      background: $color-BC4949
      width: 23px
      height: 23px
      border: 1.5px solid $color-FFFFFF
      border-radius: 50%
      position: relative
      .bargain-circle-box
        position: absolute
        all-center()
        display: flex
        align-items: center
        justify-content: center
        width: 100%
        .bargain-circle
          display: inline-block
          background: #B6B6B6
          border-radius: 100%
          height: 2px
          width: 2px
          margin: 0 0.7px

  .more
    margin-top: 2px
    margin-left: 20px
    display: flex
    width: 12px
    justify-content: space-between
    .more-item
      height: 3px
      width: 3px
      background: #e0e0e0
      border-radius: 50%
</style>
