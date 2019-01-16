<template>
  <div class="show-coupon" :class="{'border-top-1px' : border}" @click="showList" v-if="couponList.length">
    <div class="left">
      <div class="left-title">领券:</div>
      <div class="left-content">
        <div class="coupon-item" v-for="(item, idx) in couponList" :key="idx">
          <div class="icon">
            <img class="icon-img" src="../../../static/img/pic-coupon1@2x.png" alt="">
          </div>
          <div class="item-content">
            <span class="item-left">{{item.coupon_type == 3 ? '¥' + item.denomination : item.denomination + '折'}}</span>
            <div class="item-line"></div>
            <span class="item-right">{{item.is_receive ? '领' : '已领'}}</span>
          </div>
          <div class="icon">
            <img class="icon-img" src="../../../static/img/pic-coupon2@2x.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <img class="right" v-if="imageUrl" :src="imageUrl + '/zd-image/mine/icon-pressed@2x.png'" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'show-coupon',
    props: {
      couponList: {
        type: Array,
        default() {
          return []
        }
      },
      // 是否显示上面的边框
      border: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        imageUrl: this.$imageUrl
      }
    },
    methods: {
      showList() {
        this.$emit('showList')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .show-coupon
    display: flex
    align-items: center
    justify-content: space-between
    height: 44px
    padding: 0 15px
    .left
      flex: 1
      overflow: hidden
      padding-right: 20px
      display: flex
      align-items: center
      flex-wrap: nowrap
      .left-title
        font-family: $font-family-regular
        font-size: $font-size-14
        letter-spacing: 0.6px
        color: $color-1F1F1F
        width: 40px
      .left-content
        flex: 1
        overflow: hidden
        display: flex
        align-items: center
        flex-wrap: nowrap
      .coupon-item
        display: flex
        margin-right: 8px
        &:last-child
          margin-right: 0
        .item-content
          display: flex
          align-items: center
          height: 23px
          position: relative
          padding: 0 5px 0 7px
          box-sizing: border-box
          background-image: url("../../../static/img/pic-coupon3@2x.png")
          background-size: auto 23px
          .item-left
            white-space: nowrap
            display: inline-block
            padding-right: 7px
            font-size: $font-size-14
            font-family: $font-family-medium
            color: $color-ED2C2B
          .item-line
            display: block
            width: 0
            height: 13px
            border-left-1px($color-ED2C2B, dashed)
          .item-right
            white-space: nowrap
            display: inline-block
            font-size: $font-size-12
            padding-left: 5px
            font-family: $font-family-medium
            color: $color-ED2C2B
        .icon
          width: 4px
          height: 23px
          .icon-img
            display: block
            width: 4px
            height: 23px
    .right
      width: 7.5px
      height: 12.5px


</style>
