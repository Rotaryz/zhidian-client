<template>
  <div class="shop">
    <div class="back-shop">
      <p class="back-name">您正在浏览</p>
      <p class="back-title">国颐堂美容店</p>
      <div class="btn" @click="_goBack()">回自己店铺</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'back-shop',
    method: {
      _goBack() {
        let userInfoExtend = wx.getStorageSync('userInfoExtend')
        this.$turnShop({ id: userInfoExtend.shop_id, url: '/pages/guide' })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
  .back-shop
    width: 100vw
    height: 40px
    display: flex
    align-items: center
    padding: 0 15px
    box-sizing: border-box
    font-size: $font-size-14
    font-family: $font-family-regular
    color: $color-455A64
    border-bottom-1px($color-E0E2E5)
    background: $color-FFFFFF
    .back-title
      margin-left: 4px
      font-family: $font-family-medium
    .btn
      normal-button-style(normal, 90px, 26px, 23px, $font-size-12)
      col-center()
      right: 15px
</style>
