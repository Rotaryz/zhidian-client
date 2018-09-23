<template>
  <div class="error-none">
    <img v-if="imageUrl" :src="imageUrl + '/zd-image/mine/pic-nopage@2x.png'" class="blank-img">
    <p class="blank-title">抱歉！ 您访问的页面失联啦-</p>
    <p class="btn" @click="_goGuide">返回首页</p>
  </div>
</template>

<script>
  export default {
    name: 'error-none',
    onUnload () {
      wx.setStorageSync('errPage', '')
    },
    methods: {
      _goGuide() {
        console.log('dd')
        wx.switchTab({ url: '/pages/guide' })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .error-none
    padding-top: 121.5px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

  .blank-img
    height: 117px
    width: 168px

  .blank-title
    margin-top: 4px
    font-size: $font-size-14
    font-family: $font-family-regular
    color: $color-99A0AA

  .btn
    box-sizing: border-box
    font-size: $font-size-16
    margin-top: 33.5px
    font-family: $font-family-medium
    color: $color-D32F2F
    border-radius: 20.5px
    border-1px($color-D32F2F, 20.5px)
    text-align: center
    line-height: 41px
    height: 41px
    width: 140px
</style>
