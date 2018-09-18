<template>
  <div class="guide-header">
    <section class="log-wrapper">
      <img class="img" mode="aspectFill" :src="url" alt="">
      <button class="share-btn">
        <img class="share-icon" :src="imageUrl + '/zd-image/1.1/icon-share@2x.png'" alt="">
        <div class="share-txt">分享</div>
      </button>
    </section>
    <section class="content">

    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  const url = `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537869795&di=e0aba314b1c2a60f8f88128198428d90&imgtype=jpg&er=1&src=http%3A%2F%2Fmypics.zhaopin.com%2Fpic%2F2014%2F3%2F1%2F5711D4D2D34C407BA2796F44A2136490.jpg`
  export default {
    data() {
      return {url}
    },
    created() {
      console.log(this.$data)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  button
    reset-button()

  .guide-header
    position: relative
    .log-wrapper
      position: relative
      height: 75vw
      .img
        height: 100%
        width: 100%
      .share-btn
        position: absolute
        right: 0
        top: 20px
        normal-button-style(click, 70px, 32px)
        border-radius: 100px 0 0 100px
        layout(row, block, nowrap)
        justify-content: center
        align-items: center
        .share-icon
          width: 16px
          height: 16px
        .share-txt
          margin-left: 5px
          font-size: $font-size-14
</style>
