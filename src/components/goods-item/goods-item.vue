<template>
  <div class="goods-item">
    <div class="goods-img-box">
      <img class="goods-img" src="" alt="" mode="aspectFit">
    </div>
    <div class="goods-title">就放假高合金钢活佛济公海景房搞活动发几个黄金分割活佛济公活佛济公和复读机该回复</div>
    <div class="goods-down">
      <div class="down-left">
        <div class="red-icon">¥</div>
        <div class="red-num">800</div>
        <div class="del-num">¥198</div>
      </div>
      <div class="down-right">销量200</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'coupon-item',
    props: {
      coupontype: {
        type: Number,
        default: 0 // 未使用: 0 不可用: 1
      },
      couponInfo: {
        type: Object,
        default: {}
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  @import "~common/stylus/base"

  .goods-item
    border-radius: 4px
    border-1px($color-E0E2E5, 4px)
    width: 100%
    overflow: hidden
    background: $color-white
    .goods-img-box
      width: 100%
      height: 0
      padding-bottom: 100%
      position: relative
      overflow: hidden
    .goods-img
      width: 100%
      height: 100%
      position: absolute
      left: 0
      top: 0
      background: #ccc
    .goods-title
      line-height: 21px
      font-family: $font-family-medium
      font-size: $font-size-14
      color: $color-1F1F1F
      padding: 0 5px
      margin: 6px 0
      overflow: hidden
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
    .goods-down
      padding: 2px 5px 12px
      display: flex
      align-items: center
      justify-content: space-between
      .down-left
        display: flex
        align-items: flex-end
        .red-icon
          font-family: $font-family-medium
          font-size: $font-size-12
          color: $color-ED2C2B
          line-height: 12px
          padding-bottom: 1px
          margin-right: 1px
        .red-num
          font-family: $font-family-bold
          font-size: $font-size-18
          color: $color-ED2C2B
          line-height: 18px
        .del-num
          font-family: $font-family-regular
          color: $color-99A0AA
          font-size: $font-size-12
          text-decoration: line-through
          padding-bottom: 1px
          margin-left: 5px
      .down-right
        font-size: $font-size-12
        font-family: $font-family-regular
        color: $color-99A0AA

</style>
