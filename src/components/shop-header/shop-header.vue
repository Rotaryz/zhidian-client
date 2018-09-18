<template>
  <div class="shop-header">
    <swiper class="slide-box">
      <swiper-item class="slide-item">
        <img class="item" mode="aspectFill">
        <img class="item">
      </swiper-item>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        dataArray: [1, 1, 1]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .shop-header
    padding: 0 15px
    .slide-box
      height: 33.4vw
      width: 100vw
      .slide-item
        height: 33.4vw
        width: 100vw
        layout(row, block, nowrap)
        justify-content: space-between
        .item
          height: 100%
          width: 48.55%
          background fuchsia

</style>
