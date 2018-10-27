<template>
  <div class="error-none">
    <div class="img-box">
      <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/pic-nointernet@2x.png'" class="blank-img">
    </div>
    <p class="blank-title">网络好像不太给力， 请稍后再试哦~</p>
    <p class="btn" @click="_goGuide">重新加载</p>
  </div>
</template>

<script>
  import { checkIsTabPage } from 'common/js/util'
  import clearWatch from 'common/mixins/clear-watch'

  export default {
    mixins: [clearWatch],
    name: 'error-none',
    onUnload () {
      wx.setStorageSync('errPage', '')
    },
    methods: {
      _goGuide() {
        let url = '/' + wx.getStorageSync('errorUrl')
        let status = checkIsTabPage(url)
        if (status) {
          wx.switchTab({ url })
          return
        }
        wx.reLaunch({ url })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .error-none
    padding-top: 185.5px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

  .blank-img, .img-box
    height: 117px
    width: 168px

  .blank-title
    width: 126px
    text-align center
    margin-top: 4px
    font-size: $font-size-14
    font-family: $font-family-regular
    color: $color-99A0AA

  .btn
    box-sizing: border-box
    font-size: $font-size-16
    margin-top: 33.5px
    font-family: $font-family-medium
    color: $color-ED2C2B
    border-radius: 20.5px
    border-1px($color-ED2C2B, 20.5px)
    text-align: center
    line-height: 41px
    height: 41px
    width: 140px
</style>
