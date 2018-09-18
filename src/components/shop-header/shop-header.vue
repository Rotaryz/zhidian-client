<template>
  <div class="shop-header">
    <!--<swiper class="slide-box">-->
    <!--<swiper-item class="slide-item">-->
    <!--<img class="item" mode="aspectFill">-->
    <!--<img class="item">-->
    <!--</swiper-item>-->
    <!--</swiper>-->
    <div class="shop-name">国颐堂养发SPA馆（白云店）</div>
    <div class="evaluate">
      <img class="star" v-for="(item,idx) in stars" :key="idx">
      <span class="txt">大众点评</span>
    </div>
    <div class="explain open-time">营业时间：11:00-21:00</div>
    <div class="explain address">广州市海珠区 TIT 创意园A9</div>
    <div class="distance">距你340m，步行需要9分钟</div>
    <div class="btn-group">
      <img class="icon left">
      <div class="line"></div>
      <img class="icon right">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        stars: [1, 1, 1, 1, 1]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .shop-header
    padding: 0 15px
    position: relative
    .shop-name
      font-family: $font-family-medium
      font-size: $font-size-20
      color: $color-1F1F1F
    .evaluate
      layout(row, block, nowrap)
      margin: 8px 0 25px
      .star
        width: 15px
        height: 15px
        margin-right: 3.4px
        background: $color-D32F2F
        border-radius: 4px
      .txt
        margin-left: 3px
        font-size: $font-size-12
        color: $color-99A0AA
        letter-spacing: 0.28px
        line-height: 15px
    .explain
      font-size: $font-size-14
      color: $color-1F1F1F
      letter-spacing: 0.6px
    .address
      margin: 25px 0 6px
    .distance
      font-size: $font-size-12
      color: $color-99A0AA
      padding-bottom: 40px
    .btn-group
      position: absolute
      bottom: 45px
      right: 15px
      layout(row)
      align-items: center
      .line
        width: 1px
        height: 19px
        background: $color-99A0AA
        opacity: 0.3
      .icon
        width: 22px
        height: 22px
        background: $color-D32F2F
        margin: 0 15px
</style>
