<template>
  <div class="mine">
    <div class="mine-msg">
      <img class="mine-header" mode="aspectFill">
      <p class="mine-name">Seven周</p>
    </div>
    <div class="order-tab">
      <div class="order-tab-item" v-for="(item, index) in order" :key="index">
        <img :src="imageUrl + '/zd-image/mine/' + item.image" class="order-tab-icon">
        <p class="order-tab-title">{{item.title}}</p>
      </div>
    </div>
    <div class="manager-list">
      <navigator hover-class="none" class="manager-item" v-for="(item, index) in manager" :key="index">
        <img :src="imageUrl + '/zd-image/mine/' + item.image" class="manager-image">
        <p class="manager-image-title">{{item.title}}</p>
        <div class="mine-serve-avatar-box" v-if="index === 2">
          <div class="mine-serve-avatarBox-item" v-for="(items, idx) in header" :key="idx">
            <img class="mine-serve-avatarBox-img">
          </div>
          <span class="shop-num">1家</span>
        </div>
        <img :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" class="way">
      </navigator>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ORDER = [{ title: '待付款', status: '', image: 'icon-obligation@2x.png' }, { title: '待成团', status: '', image: 'icon-staygroup@2x.png' }, { title: '已退款', status: '', image: 'icon-refund@2x.png' }, { title: '全部订单', status: '', image: 'icon-alloeder@2x.png' }]
  const MANAGER = [{ title: '我的兑换券', status: '', image: 'icon-coupon_my@2x.png' }, { title: '我的砍价', status: '', image: 'icon-sale@2x.png' }, { title: '浏览过的店', status: '', image: 'icon-shop_my@2x.png' }, { title: 'AI雷达智店，我要开店', status: '', image: 'icon-openshop@2x.png' }]
  export default {
    data() {
      return {
        order: ORDER,
        manager: MANAGER,
        imageUrl: this.$imageUrl,
        header: [1, 1, 1, 1, 1, 1]
      }
    },
    onShow() {
      // console.log(this.$imageUrl, '--7777')
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .mine
    font-family: $font-family-regular
    padding: 0 14px
    box-sizing: border-box
    .mine-msg
      padding-top: 15.5px
      display: flex
      align-items: center
      .mine-header
        background: $color-background
        border-radius: 50%
        height: 75px
        width: 75px
      .mine-name
        letter-spacing: 0.9px
        margin-left: 15px
        color: $color-1F1F1F
        font-size: $font-size-18
        font-family: $font-family-medium
    .order-tab
      margin-top: 23.5px
      box-sizing: border-box
      justify-content: space-between
      padding: 0 9.33vw
      height: 95px
      display: flex
      border-1px(rgba(153, 160, 170, 0.10), 6px)
      box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.10)
      border-radius: 6px
      .order-tab-item
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .order-tab-icon
          height: 25px
          width: @height
          margin-bottom: 8.5px
        .order-tab-title
          font-size: $font-size-12
          color: $color-6E6E6E
    .manager-list
      .manager-item
        height: 25px
        margin-top: 32px
        display: flex
        position: relative
        align-items: center
        .manager-image
          height: 18px
          width: 18px
        .way
          position: absolute
          col-center()
          right: 0px
          width: 7.5px
          height: 12.5px
        .manager-image-title
          margin-left: 15.5px
          color: $color-1F1F1F
          letter-spacing: 0.8px
          font-size: $font-size-16
        .mine-serve-avatar-box
          position: absolute
          right: 4px
          display: flex
          margin-right: 10.5px
          align-items: center
          height: 100%
        .shop-num
          font-size: $font-size-14
          margin-left: 16px
          color: $color-99A0AA
          line-height: 1
        .mine-serve-avatarBox-item
          width: 25px
          height: 25px
          box-sizing: border-box
          border-radius: 50%
          margin-right: -11px
          .mine-serve-avatarBox-img
            background: $color-BC4949
            width: 25px
            height: 25px
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
</style>
