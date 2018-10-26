<template>
  <div class="wheel-header">
    <div class="rule" @click="showRule">
      <img class="icon-img" mode="aspectFill" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-rule@2x.png'" alt="">
    </div>
    <div class="title-log">
      <img style="width: 100%" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-thrntable_title@2x.png'" alt="">
    </div>
    <div class="btn-wrapper">
      <button class="btn-share" open-type="share">
        <img class="icon-img" mode="aspectFill" v-if="imageUrl" :src="imageUrl + '/zd-image/wheel/pic-share_turntable@2x.png'" alt="">
      </button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    onShareAppMessage() {
      // this.setShowType(true)
      // this.sendCustomMsg(10004) // 转发给好友
      // let id = wx.getStorageSync('userInfo').id
      // let shopId = wx.getStorageSync('shopId')
      return {
        // title: self.shopInfo.name,
        // imageUrl: `${self.imageUrl}/zd-image/wheel/pic-share_qun@2x.png`,
        success: (res) => {
          // 转发成功
        },
        fail: (res) => {
          // 转发失败
        }
      }
    },
    onLoad() {
      // console.log(`${this.imageUrl}/zd-image/wheel/pic-share_qun@2x.png`)
    },
    methods: {
      showRule() {
        console.log(222)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .icon-img
    width: 100%
    height: 100%

  .wheel-header
    position relative
    .title-log
      margin: 0 auto
      width: 79.1%
    .rule
      width: 15.2vw
      height: 5.867vw
      margin: 4vw 0 2px 5.333vw
      extend-click()
    .btn-wrapper
      position: absolute
      right: 5.333vw
      top: 0
      .btn-share
        reset-button()
        width: 8.533vw
        height: @width
        extend-click()
</style>
